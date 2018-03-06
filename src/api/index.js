class Api {
    setToken(token) {
        this.token = token;
    }

    async request(url, options = {}) {
        try {
            const res = await fetch(
                url,
                {
                    ...options,
                    headers : {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authentication: this.token,
                        ...options.headers
                    }
                }
            );

            const data = await res.json();

            return data;
        } catch (err) {
            console.log('Request error: ', err);
        }
    }
}

export default new Api();
