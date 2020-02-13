export default () => {
  if (sessionStorage.getItem('active')) {
    return true;
  }
  else {
    if (localStorage.getItem('remember') === "false") {
      localStorage.removeItem('auth-token');
    }
    return true;
  }
}