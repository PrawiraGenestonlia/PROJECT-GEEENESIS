import React from 'react';

export default () => (
  <div id="reloadbar" className="show" onClick={async () => {
    await navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
    window.location.reload(true);
  }}>
    A new version of this app is available. Click <span><strong>here</strong></span> to update.
  </div>
)