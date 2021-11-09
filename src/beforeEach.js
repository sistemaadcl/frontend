export const isAuthenticated = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem('token'))) || null;
    console.log(token);
    if (token == null) {
        return false
    } else {
        return true
    };
}

export const isRole = () => {
    const token = JSON.parse(localStorage.getItem('userInfo')) || null;
    console.log(token);
    if (token == null) {
        return false
    } else {
        return token
    };
}