import React from 'react';

export default () => {
  return (
    <div>
      <h1>Login Screen</h1>
      <button onClick={() => { localStorage.setItem('auth-token', 100); window.location.reload() }}>Login</button>
    </div>
  )
}