import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/topNavBar';
import { Spin, message } from 'antd';
import { getMentorProfile } from '../api';
import BottomDiv from '../components/bottomDiv';
import { useLocation } from 'react-router-dom';
import { THEME_COLOR } from '../enum';

export default (props) => {
  const searchTargetId = props.match.params.target_id || '';
  // const searchName = props.match.params.name || '';
  const [data, setData] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    searchProfile(searchTargetId);
  }, [searchTargetId]);

  const searchProfile = (searchTargetId) => {
    getMentorProfile(searchTargetId).then((msg) => {
      let messages = msg ? (msg.data ? msg.data : JSON.stringify(msg)) : JSON.stringify(msg);
      Object.keys(msg).length > 2 ? setData(msg) : setData(messages);
    }).catch(async (err) => {
      let messages = err ? (err.data ? err.data : JSON.stringify(err)) : JSON.stringify(err);
      message.error(messages, 5);
    });
  }

  return (
    <div>
      <TopNavBar title={`@${searchTargetId}`} back="Circle" />
      {
        Object.keys(data).length ?
          <div className="text-justify rounded-md p-2" style={{ backgroundColor: THEME_COLOR['BACKGROUND_SECONDARY'] }}>
            <span className="font-bold">{data["name"]}</span>
            <p>{data["position"]}</p>
            <p>
              Email: <a href={`mailto:${data["email"]}`} >{data["email"]}</a>
            </p>
            {
              data["Biography"] ?
                <p>
                  <h3 className="font-bold">Biography</h3>
                  <p>{data["Biography"].length ? data["Biography"][0] : null}</p>
                </p>
                : null
            }
            {
              data["Current Projects"] ?
                <p>
                  <h3 className="font-bold">Current Projects</h3>
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
                  <h3 className="font-bold">Selected Publications</h3>
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
            <BottomDiv />
          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
    </div>
  )
}