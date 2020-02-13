import React from 'react';

const unregisterServiceWorker = async () => {
  navigator.serviceWorker.getRegistrations().then(async registrations => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = [];
        for (let i = 0; i < registrations.length; i++) {
          const j = await registrations[i].unregister();
          console.log(j);
          result.push(j);
        }
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
}



export default () => (
  <div id="reloadbar" onClick={() => {
    unregisterServiceWorker().then(() => { window.location.reload(true) })
  }}>
    A new version of this app is available. Click <span><strong>here</strong></span> to update.
  </div>
)
