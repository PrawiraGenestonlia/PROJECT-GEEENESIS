import axios from 'axios';
import getToken from '../utils/getToken';
import {
  LOGIN_URI,
  CHANGE_PASSWORD_URI,
  FORGET_PASSWORD_URI
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

export const forgetPassword = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      axios.post(FORGET_PASSWORD_URI, {
        "email": email,
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