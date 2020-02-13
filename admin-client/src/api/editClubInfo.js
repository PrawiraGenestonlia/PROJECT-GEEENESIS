import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, UPDATECLUB } from '../constants';

export default async (clubInfo) => {
  const url = `${SERVERURL}${UPDATECLUB}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "title": clubInfo.title,
      "bannerImgLink": clubInfo.bannerImgLink,
      "server_unique_name": clubInfo.server_unique_name,
      "summary": clubInfo.summary,
      "rawEditor": clubInfo.rawEditor,
      "contactLink": clubInfo.contactLink
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}