import React, { useEffect } from 'react';
import { Button, Divider } from 'antd';
import unregisterServiceWorker from '../utils/unregisterServiceWorker';
import TopNavBar from '../components/topNavBar';
import { useLocation } from 'react-router-dom';
import { THEME_COLOR } from '../enum';

export default () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <TopNavBar title="About" back="Me" />
      <div className="rounded-md p-2" style={{ backgroundColor: THEME_COLOR['BACKGROUND_SECONDARY'] }}>

        <div>
          <h5 className="font-bold">About the App</h5>
          <p>Description and Summary</p>
        </div>
        <Divider />
        <div>
          <h5 className="font-bold">Contacts</h5>
          <p> Click &nbsp;
                    <a href="mailto:praw0001@e.ntu.edu.sg?subject=From GEEENESIS App&cc=xgshao@ntu.edu.sg" >
              Send email
                    </a>
                    &nbsp; to send an email and contribute your idea.
                </p>
        </div>
        <Divider />
        <div>
          <h5 className="font-bold">Version Control</h5>
          <p>
            Version: 0.5.4
          <br />
            <span className="text-gray-500">(Last updated: 01 June 2020)</span>
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
    </div>

  )
}