export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
  
  export function infoToken() {
  const info = JSON.parse(localStorage.getItem('userInfo'));
  return info ? info.role : {}
  }