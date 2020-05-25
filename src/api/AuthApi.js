import API from './index';

const login = (username, password) => {
    return API.post("/auth/login", {
    username,
    password
    });
}

const register = (username, name, password) => {
    return API.post("/auth/register", {
        username,
        name,        
        password
    });
}

export {login, register};