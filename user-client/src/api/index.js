import axios from 'axios';
import getToken from '../utils/getToken';
import {
  LOGIN_URI,
  CHANGE_PASSWORD_URI,
  GETEVENT,
} from './constants.api';

export const login = async (user) => {
  return new Promise((resolve, reject) => {
    try {
      axios.post(LOGIN_URI, {
        "email": user.email.toLowerCase(),
        "password": user.password
      }).then((res) => {
        resolve(res.data);
      }).catch((e) => {
        reject(e.response);
      })
    } catch (err) {
      reject(err);
    }
  });
}

export const changePassword = async (data) => {
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(CHANGE_PASSWORD_URI, {
      "currentPassword": data.currentPassword,
      "newPassword": data.newPassword,
      "newPasswordValidation": data.newPasswordValidation
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}

export const getEvents = async ({ year, eventUniqueName, eventCreator }) => {
  let url = GETEVENT;
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

export { getMyProfile } from './profile.api';