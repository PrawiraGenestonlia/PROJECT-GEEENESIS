import React, { useState } from 'react';
import { Input, message } from 'antd';
import { getMentorProfile } from '../api';

const { Search } = Input;

export default () => {
    const [data, setData] = useState({});
    const [loadingState, setLoadingState] = useState(false);

    const onSearch = (value) => {
        setLoadingState(true);
        const networkName = value.lastIndexOf("@") >= 0 ? value.substring(0, value.lastIndexOf("@")) : value;
        getMentorProfile(networkName).then((msg) => {
            let messages = msg ? (msg.data ? msg.data : JSON.stringify(msg)) : JSON.stringify(msg);
            setData(messages);
            setLoadingState(false);
        }).catch(async (err) => {
            let messages = err ? (err.data ? err.data : JSON.stringify(err)) : JSON.stringify(err);
            message.error(messages, 5);
            setLoadingState(false);
        });
    }

    return (
        <div>
            <div className="flex items-center justify-center mt-3">
                <Search
                    placeholder="network name / email"
                    onSearch={value => onSearch(value)}
                    style={{ width: '90%' }}
                    loading={loadingState}
                />
            </div>
            <div className="mt-3">
                {
                    Object.keys(data).length ?
                        <>
                            {JSON.stringify(data)}
                        </>
                        :
                        null
                }
            </div>
        </div>
    )
}