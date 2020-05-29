import React from 'react';
import { Button, Divider } from 'antd';
import unregisterServiceWorker from '../utils/unregisterServiceWorker';
import TopNavBar from '../components/topNavBar';

export default () => {

  return (
    <div className="bg-white rounded-md p-2">
      <TopNavBar title="About" back="Me" />
      <div>
        <h2>About the App</h2>
        <p>Description and Summary</p>
      </div>
      <Divider />
      <div>
        <h2>Bugs Report</h2>
        <p> Click &nbsp;
                    <a href="mailto:praw0001@e.ntu.edu.sg?subject=From GEEENESIS App&cc=xgshao@ntu.edu.sg" >
            Send email
                    </a>
                    &nbsp; to send an email and contribute your idea.
                </p>
      </div>
      <Divider />
      <div>
        <h2>Versioning</h2>
        <p>
          Version: 0.5.4
          <br />
          <span className="text-gray-500">(Last updated: 29 May 2020)</span>
        </p>
        <p>
          <Button block type="dashed" danger onClick={() => {
            unregisterServiceWorker().then(() => { window.location.reload(true) })
          }}>
            Update to latest version
                </Button>
        </p>
      </div>
      <Divider />
    </div>
  )
}