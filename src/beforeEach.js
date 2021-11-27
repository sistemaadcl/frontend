export const isAuthenticated = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem('token'))) || null;
    if (token == null) {
        return false
    } else {
        return true
    };
}

export const isRole = () => {
    const token = JSON.parse(localStorage.getItem('userInfo')) || null;
    if (token == null) {
        return false
    } else {
        return token
    };
}