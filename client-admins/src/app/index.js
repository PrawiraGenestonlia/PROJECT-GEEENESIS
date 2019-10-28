import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ADMIN_BASE_URL } from '../constants';
import NavBar from './components/navBar';
import Pages from '../router';

export default () => {
  return (
    <BrowserRouter basename={ADMIN_BASE_URL}>
      <div className="flex h-screen w-screen">
        <div className="h-screen w-2/12 shadow-lg overflow-hidden" style={{ minWidth: '12rem' }} >
          <NavBar />
        </div>
        <div className="h-full w-10/12 overflow-auto" style={{ backgroundColor: 'F5F6F7' }} >
          <div className="p-4"><Pages /></div>
        </div>

      </div>

    </BrowserRouter>
  )
}