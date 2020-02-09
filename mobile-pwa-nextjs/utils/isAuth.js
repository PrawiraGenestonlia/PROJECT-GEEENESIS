const isAuth = () => {
  let authToken = localStorage.getItem('auth-token');
  if (authToken) return true;
  else return false;
}

export default isAuth;