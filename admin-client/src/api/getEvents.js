import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, GETEVENT } from '../constants';

export default async ({ year, eventUniqueName, eventCreator }) => {
  let url = `${SERVERURL}${GETEVENT}`;
  if (year) url += `?year=${year}`;
  else if (eventUniqueName) url += `?event=${eventUniqueName}`;
  else if (eventCreator) url += `?createdBy=${eventCreator}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.get(url, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}