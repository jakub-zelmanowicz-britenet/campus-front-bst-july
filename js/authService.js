const login = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const auth_data = await response.json();
        const user_id = auth_data.userId;
        const user_token = auth_data.userToken;
        sessionStorage.setItem('user_id', user_id);
        sessionStorage.setItem('user_token', user_token);

        return Promise.resolve();

    } catch (e) {
        return Promise.reject(e);
    }
}

const register = (username, password) => {
    //TODO
}

const logout = () => {
    //TODO
}

const isLoggedIn = () => {
    return sessionStorage.getItem('user_id') != null;
}

const performLogin = () => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    console.log(username);
    console.log(password);

    login(username, password)
        .then( data => {
            //TODO zalogowano!
            alert('Zalogowano!');
            createProduct()
                .then(_ => {})
                .catch(e => console.log(e))

        } )
        .catch( err => {
            console.log('Error');
            console.log(JSON.stringify(err));
        });

    return false;
}

