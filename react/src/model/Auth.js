const loginUrl = 'http://localhost:3000/user/login';
const registerUrl = 'http://localhost:3000/user/';
const isTesting = true;

// one object is enough
const Auth = {
    isAuthenticated: false,
    user: {},
    errorMessage: 'System error, try again later',
    loginOrRegister(toRegister, name, password, callback, systemError) {

        if (isTesting) {
            this.user.name = name;
            this.isAuthenticated = true;
            // use timeout to remove warning of set state in update state
            setTimeout(callback, 0);
            return;
        }

        var data = {
            name: name,
            password: password
        };

        let url = toRegister ? registerUrl : loginUrl;
        let method = toRegister ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            // res of fetch
            if (res.ok) {
                res.json().then(res => {
                    // real res
                    if (res.status === 0) {
                        this.user.name = name;
                        this.isAuthenticated = true;
                    }
                    callback(res.message);
                });
            } else {
                console.error('Error:', '404 or CORS');
                systemError(this.errorMessage);
            }
        }).catch(error => {
            console.error('Error:', error);
            systemError(this.errorMessage);
        });

    },
    logout(callback) {
        this.isAuthenticated = false;
        callback();
    }
};

export default Auth;