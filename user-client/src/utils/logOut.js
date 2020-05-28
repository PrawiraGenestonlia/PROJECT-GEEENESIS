const logout = () => {
  localStorage.removeItem('auth-token');
  window.location.reload();
}

export default logout;