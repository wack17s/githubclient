import config from '../etc/config';

import api from './index';

export async function getToken(code) {
    const data = await api.request(
        'https://github.com/login/oauth/access_token',
        {
            method: 'post',
            body: JSON.stringify({
                client_id: config.clintId,
                client_secret: config.clientSecret,
                code
            })
        }
    ) || {};

    const { access_token: token } = data;

    if (token) {
        api.setToken(token);
    }

    return data;
}
