export default () => {
  let authToken = localStorage.getItem('auth-token');
  if (authToken) return authToken;
  else return false;
}
