import config from '../etc/config';

export async function getToken(code) {
    const res = await fetch(
        'https://github.com/login/oauth/access_token',
        {

            method: 'post',
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: config.clintId,
                client_secret: config.clientSecret,
                code
            })
        }
    );

    const data = await res.json();

    return data;
}
