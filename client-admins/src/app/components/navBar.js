import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

export default () => {
  return (
    <nav class="h-screen nav p-4">
      <div class="text-center">
        <Link to="/"><span class="text-white">GEEENESIS ADMIN</span></Link>
      </div>
    </nav>
  )

}