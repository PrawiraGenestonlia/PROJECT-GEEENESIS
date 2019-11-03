import React from 'react';

export default () => (
  <div id="reloadbar" onClick={() => { window.location.reload(true) }}>
    A new version of this app is available. Click <span><strong>here</strong></span> to update.
  </div>
)