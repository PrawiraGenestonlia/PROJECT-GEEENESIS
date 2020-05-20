import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default () => {
    const [data, setData] = useState({});

    const onSearch = (value) => {

    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <Search
                    placeholder="network name / email"
                    onSearch={value => console.log(value)}
                    style={{ width: '90%' }}
                />
            </div>
            <div>
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