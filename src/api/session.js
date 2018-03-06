import base64 from 'base-64';

import api from './index';

export async function login(username, password) {
    const timestamp = Date.now();

    const data = await api.request(
        'https://api.github.com/authorizations',
        {
            method: 'post',
            headers: {
                Authorization: `Basic ${base64.encode(`${username}:${password}`)}`
            },
            body: JSON.stringify({
                scopes: [ 'repo', 'user' ], note: `getting-started for ${username}-${timestamp}` })
        }
    ) || {};

    const { token } = data;

    if (token) {
        api.setToken(token);
    }

    return data;
}
