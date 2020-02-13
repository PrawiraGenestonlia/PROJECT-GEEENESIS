import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, UPLOADIMAGE } from '../constants';

export default async (fileInput) => {
  let url = `${SERVERURL}${UPLOADIMAGE}`;
  const token = getToken();
  // const file = new Blob([fileInput], { type: fileInput.type });
  const file = fileInput;
  const formData = new FormData();
  formData.append('image', file, file.filename);
  return new Promise((resolve, reject) => {
    axios.post(url, formData, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}