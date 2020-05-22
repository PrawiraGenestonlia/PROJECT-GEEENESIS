import React, { useState } from 'react';
import { Divider, Input, message } from 'antd';
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
      Object.keys(msg).length > 2 ? setData(msg) : setData(messages);
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
          onSearch={value => value ? onSearch(value) : null}
          style={{ width: '90%' }}
          loading={loadingState}
        />
      </div>
      <Divider />
      <div className="mt-3 text-justify">
        {
          Object.keys(data).length ?
            <>
              <h2>{data["name"]}</h2>
              <p>{data["position"]}</p>
              <p>
                Email: <a href={`mailto:${data["email"]}`} >{data["email"]}</a>
              </p>
              {
                data["Biography"] ?
                  <p>
                    <h3>Biography</h3>
                    <p>{data["Biography"].length ? data["Biography"][0] : null}</p>
                  </p>
                  : null
              }
              {
                data["Current Projects"] ?
                  <p>
                    <h3>Current Projects</h3>
                    <p>
                      {data["Current Projects"].length ?
                        <ul className="list-disc ml-4">
                          {
                            data["Current Projects"].map((cp) => {
                              return <li>{cp}</li>
                            })
                          }
                        </ul>
                        : null}
                    </p>
                  </p>
                  : null
              }
              {
                data["Selected Publications"] ?
                  <p>
                    <h3>Selected Publications</h3>
                    <p>
                      {data["Selected Publications"].length ?
                        <ul className="list-disc ml-4">
                          {
                            data["Selected Publications"].map((cp) => {
                              return <li>{cp}</li>
                            })
                          }
                        </ul>
                        : null}
                    </p>
                  </p>
                  : null
              }
            </>
            :
            null
        }
      </div>
    </div>
  )
}