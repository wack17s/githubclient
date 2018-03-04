import { dumpRepos } from './dumpUtils';

import api from './index';

export async function fetchRepos({ query, sort, perPage, page }) {
    const url = `https://api.github.com/search/repositories?q=${query}
        ${sort ? `+sort:${sort}` : ''}&per_page=${perPage}&page=${page}`;

    const data = await api.request(
        url,
        { method: 'get', headers: { Accept: 'application/vnd.github.mercy-preview+json' } }
    ) || {};

    if (!data.error) return dumpRepos(data.items);

    return data;
}
