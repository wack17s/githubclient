import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import List from '../../components/List';

import { fetchRepos } from '../../actions/repos';

import { getRepos } from '../../selectors/repos';

import { webview } from '../../utils/modals';
import { cropText } from '../../utils/common';

import styles from './styles';

class Main extends PureComponent {
    static propTypes = {
        fetchRepos : PropTypes.func.isRequired,
        repos      : PropTypes.array
    }

    static defaultProps = {
        repos: []
    }

    state = {
        loading: true
    }

    handleFetchRepos = ({ page, perPage, onEmpty = () => {}, callback = () => {} }) => {
        this.props.fetchRepos(
            'navigation',
            '',
            () => {
                this.setState({ loading: false });
                callback();
            },
            error => {
                if (error === 'empty') onEmpty();

                callback();
            },
            page,
            perPage
        );
    }

    handleOpenRepo = url => {
        webview.open({ url });
    }

    renderItem = ({ item }) => {
        const { url, name, owner, description, stars, forks, issues, createdAt, updatedAt } = item;

        return (
            <TouchableOpacity onPress={this.handleOpenRepo.bind(null, url)}>
                <View style={styles.item}>
                    <Text style={styles.text}>{`Name: ${cropText(name)}`}</Text>
                    <Text style={styles.text}>{`Owner: ${cropText(owner)}`}</Text>

                    {description && <Text style={styles.desc}>{cropText(description)}</Text>}

                    <View>
                        <Text style={styles.text}>{`Stars: ${stars}`}</Text>
                        <Text style={styles.text}>{`Forks: ${forks}`}</Text>
                        <Text style={styles.text}>{`Issues: ${issues}`}</Text>
                    </View>

                    <Text style={styles.text}>{`Created at: ${createdAt}`}</Text>
                    <Text style={styles.text}>{`Last update: ${updatedAt}`}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'black' }}>Main Page</Text>
                <List
                    data         = {this.state.loading ? [] : this.props.repos}
                    onDataNeeded = {this.handleFetchRepos}
                    renderItem   = {this.renderItem}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        repos: getRepos(state)
    };
}

export default connect(mapStateToProps, { fetchRepos })(Main);
