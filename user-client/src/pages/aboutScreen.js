import React from 'react';
import { Button, Divider } from 'antd';

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

export default () => {

    return (
        <div>
            <div>
                <h1>About Screen</h1>
            </div>
            <Divider />
            <div>
                Description and Summary
            </div>
            <Divider />
            <div>
                Contacts and Bugs Report
                <p><a
                    href="mailto:praw0001@e.ntu.edu.sg?subject=From GEEENESIS App&cc=xgshao@ntu.edu.sg"
                >Send email</a></p>
            </div>
            <Divider />
            <div>
                Version: 0.5.4
            </div>
            <Divider />
            <div>
                <Button type="dashed" danger onClick={() => {
                    unregisterServiceWorker().then(() => { window.location.reload(true) })
                }}>
                    Update to latest version
                </Button>
            </div>
            <Divider />
        </div>
    )
}