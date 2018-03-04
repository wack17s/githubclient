import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import List from '../../components/List';
import SearchInput from '../../components/SearchInput';
import SortBlock from '../../components/SortBlock';

import { fetchRepos } from '../../actions/repos';

import { getRepos } from '../../selectors/repos';

import { webview } from '../../utils/modals';
import { format } from '../../utils/date';
import { cropText, debounceLast } from '../../utils/common';

import styles from './styles';

const EMPTY_AFTER_FETCH_MSG = 'Ther is not repository with name: ';
const EMPTY_MSG = 'Start seraching to load repositories.';

class Main extends PureComponent {
    static propTypes = {
        fetchRepos : PropTypes.func.isRequired,
        repos      : PropTypes.array
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

                callback();
            },
            page,
            perPage
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

        return (
            <View style={styles.emptyBlock}>
                <Text>
                    {isEmptyArfterFetch ? `${EMPTY_AFTER_FETCH_MSG}${searchQuery}` : EMPTY_MSG}
                </Text>
            </View>
        );
    }

    render() {
        const { searchQuery, loading, sort } = this.state;
        const { repos } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <SearchInput text={searchQuery} onChangeText={this.handleSearch} />
                </View>
                <SortBlock onChange={this.handleSortBy} choosed={sort} />
                <View style={styles.listContainer}>
                    <List
                        ref = {item => {
                            this.list = item;
                        }}
                        data         = {loading ? [] : repos}
                        onDataNeeded = {this.handleFetchRepos}
                        renderItem   = {this.renderItem}
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

export default connect(mapStateToProps, { fetchRepos })(Main);
