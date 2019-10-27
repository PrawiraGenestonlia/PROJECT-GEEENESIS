import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

function handleLogOut() {
  localStorage.removeItem('auth-token');
  window.location.reload();
}

export default () => {
  return (
    <nav class="h-screen nav p-4">
      <div class="text-center">
        <Link to="/"><span class="text-white">GEEENESIS ADMIN</span></Link>
      </div>
      <div class="flex items-center justify-center">
        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => { handleLogOut() }}>
          Log Out
        </button>
      </div>

    </nav>
  )

}