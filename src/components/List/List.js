import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, View, ActivityIndicator, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = {
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingTop: height / 2 - 74,
        backgroundColor: 'transparent'
    }
};

export default class List extends PureComponent {
    static propTypes = {
        data         : PropTypes.array.isRequired,
        renderItem   : PropTypes.func.isRequired,
        isConnected  : PropTypes.bool.isRequired,
        onDataNeeded : PropTypes.func,
        withSpinner  : PropTypes.bool
    }

    static defaultProps = {
        onDataNeeded: null,
        withSpinner: true
    }

    state = {
        loading: false
    }

    // // eslint-disable-next-line
    // UNSAFE_componentWillMount() {
    //     if (this.props.onDataNeeded) this.fetchData();
    // }

    handleRefresh = () => {
        if (!this.props.isConnected) return;

        this.refreshing = true;
        this.locked = false;
        this.page = 1;

        this.fetchData();
    }

    handleEndReached = () => {
        if (this.perPage > this.props.data.length || !this.props.isConnected) return;

        this.page++;

        this.fetchData();
    }

    fetchData = () => {
        const { page, perPage, locked } = this;

        if (!locked && !this.state.loading) {
            this.setState({ loading: true });

            this.props.onDataNeeded({
                page,
                perPage,
                onEmpty: () => {
                    this.locked = true;
                },
                callback: () => {
                    this.refreshing = false;
                    this.setState({ loading: false });
                }
            });
        }
    }

    fetchByMain = () => {
        this.locked = false;
        this.page = 1;

        this.fetchData();
    }

    refreshing = false
    page = 1
    perPage = 15
    locked = false

    keyExtractor = item => item.url || Math.random()

    render() {
        const { data, renderItem, onDataNeeded, withSpinner } = this.props;

        return (
            <View>
                {onDataNeeded
                    ? (
                        <FlatList
                            data           = {data}
                            renderItem     = {renderItem}
                            keyExtractor   = {this.keyExtractor}
                            onEndReached   = {this.handleEndReached}
                            refreshControl = {
                                <RefreshControl
                                    refreshing = {this.refreshing}
                                    onRefresh  = {this.handleRefresh}
                                />
                            }
                            onEndReachedThreshold = {0.5}
                        />
                    )
                    : (
                        <FlatList
                            data         = {data}
                            renderItem   = {renderItem}
                            keyExtractor = {this.keyExtractor}
                        />
                    )}
                {this.state.loading && withSpinner && (
                    <View style={styles.spinner}>
                        <ActivityIndicator size='large' color='green' />
                    </View>
                )}
            </View>);
    }
}
