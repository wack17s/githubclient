import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import withNetInfo from '../../helpers/withNetInfo';

import List from '../../components/List';
import TextInput from '../../components/TextInput';
import SortBlock from '../../components/SortBlock';

import { fetchRepos, fetchReposEmpty } from '../../actions/repos';

import { getRepos } from '../../selectors/repos';

import { webview } from '../../utils/modals';
import { format } from '../../utils/date';
import { cropText, debounceLast } from '../../utils/common';

import styles from './styles';

const EMPTY_AFTER_FETCH_MSG = 'Ther is not repository with name: ';
const EMPTY_MSG = 'Start searching to load repositories.';
const OFFLINE_MSG = 'Offline';

const PLACEHOLDER = 'Start typing to find a repository..';

class Main extends PureComponent {
    static propTypes = {
        fetchRepos      : PropTypes.func.isRequired,
        fetchReposEmpty : PropTypes.func.isRequired,
        isConnected: PropTypes.bool.isRequired,
        repos: PropTypes.array
    }

    static defaultProps = {
        repos: []
    }

    state = {
        loading: true,
        searchQuery: '',
        sort: '',
        isEmptyArfterFetch: false
    }

    componentDidMount() {
        if (!this.props.isConnected) {
            this.list.fetchByMain();
        }
    }

    componentDidUpdate(prevProps) {
        const { isConnected } = this.props;

        if (prevProps.isConnected && !isConnected) {
            this.list.fetchByMain();

            this.setState({ searchQuery: '', sort: '' });
        } else if (!prevProps.isConnected && isConnected) {
            this.props.fetchReposEmpty();
        }
    }

    handleFetchRepos = ({ page, perPage, onEmpty = () => {}, callback = () => {} }) => {
        const { searchQuery, sort } = this.state;

        this.props.fetchRepos(
            searchQuery,
            sort,
            () => {
                this.setState({ loading: false, isEmptyArfterFetch: false });
                callback();
            },
            error => {
                if (error === 'empty') {
                    onEmpty();

                    this.setState({ isEmptyArfterFetch: true });
                }

                this.setState({ loading: false });

                callback();
            },
            page,
            perPage,
            this.props.isConnected
        );
    }

    handleOpenRepo = url => {
        webview.open({ url });
    }

    handleSearch = searchQuery => {
        this.setState({ searchQuery, isEmptyArfterFetch: false });

        this.debouncedSearch();
    }

    handleSortBy = sort => {
        this.setState(
            { sort },
            () => {
                if (this.state.searchQuery) {
                    this.list.fetchByMain();
                }
            }
        );
    }

    debouncedSearch = debounceLast(
        () => {
            if (this.state.searchQuery) {
                this.list.fetchByMain();
            } else {
                this.props.fetchReposEmpty();
            }
        },
        1000
    )

    renderItem = ({ item }) => {
        const { url, name, owner, description, stars, forks, issues, createdAt, updatedAt } = item;

        return (
            <TouchableOpacity onPress={this.handleOpenRepo.bind(null, url)}>
                <View style={styles.item}>
                    <Text style={styles.text}>{cropText(`Name: ${name}`)}</Text>
                    <Text style={styles.text}>{cropText(`Owner: ${owner}`)}</Text>

                    {description && <Text style={styles.text}>{cropText(`Desc: ${description}`)}</Text>}

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>{cropText(`Stars: ${stars}`)}</Text>
                        <Text style={styles.text}>{cropText(`Forks: ${forks}`)}</Text>
                        <Text style={styles.text}>{cropText(`Issues: ${issues}`)}</Text>
                    </View>

                    <Text style={styles.text}>{cropText(`Created at: ${format(createdAt)}`)}</Text>
                    <Text style={styles.text}>{cropText(`Last update: ${format(updatedAt)}`)}</Text>
                    <View style={styles.line} />
                </View>
            </TouchableOpacity>
        );
    }

    renderEmptyBlock = () => {
        const { isEmptyArfterFetch, searchQuery } = this.state;
        const withConnectionMsg = isEmptyArfterFetch ? `${EMPTY_AFTER_FETCH_MSG}${searchQuery}` : EMPTY_MSG;

        return (
            <View style={styles.emptyBlock}>
                <Text>
                    {this.props.isConnected ? withConnectionMsg : OFFLINE_MSG}
                </Text>
            </View>
        );
    }

    render() {
        const { searchQuery, loading, sort } = this.state;
        const { repos, isConnected } = this.props;

        return (
            <View style={styles.container}>
                {isConnected
                    ? (
                        <View>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    text         = {searchQuery}
                                    onChangeText = {this.handleSearch}
                                    placeholder  = {PLACEHOLDER}
                                />
                            </View>
                            <SortBlock onChange={this.handleSortBy} choosed={sort} />
                        </View>
                    )
                    : (
                        <View style={styles.offlineHeader}>
                            <Text>You are offline now!</Text>
                            {repos && <Text>Last search results:</Text>}
                        </View>
                    )}
                <View style={styles.listContainer}>
                    <List
                        ref = {item => {
                            this.list = item;
                        }}
                        data         = {loading ? [] : repos}
                        onDataNeeded = {this.handleFetchRepos}
                        renderItem   = {this.renderItem}
                        isConnected  = {isConnected}
                    />
                </View>
                {!repos.length && this.renderEmptyBlock()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        repos: getRepos(state)
    };
}

export default connect(mapStateToProps, { fetchRepos, fetchReposEmpty })(withNetInfo(Main));
