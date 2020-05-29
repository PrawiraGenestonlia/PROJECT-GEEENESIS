import axios from 'axios';
import getToken from '../utils/getToken';
import {
  GETMYPROFILE, GETMYCHATLIST, CHANGEAVATAR,
  ADD_FAV_EVENT, DEL_FAV_EVENT,
  ADD_INTERESTED_EVENT, DEL_INTERESTED_EVENT,
  ADD_PARTICIPATED_EVENT, DEL_PARTICIPATED_EVENT,
} from './constants.api';

export const getMyProfile = async () => {
  let url = GETMYPROFILE;
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

export const getMyChatList = async () => {
  let url = GETMYCHATLIST;
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

export const changeAvatar = async (fileInput) => {
  let url = CHANGEAVATAR;
  const token = getToken();
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


export const addFavEvent = async (eventObj) => {
  let url = ADD_FAV_EVENT;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, eventObj, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res.data);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}

export const delFavEvent = async (eventObj) => {
  let url = DEL_FAV_EVENT;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, eventObj, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res.data);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}

export const addInterestedEvent = async (eventObj) => {
  let url = ADD_INTERESTED_EVENT;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, eventObj, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res.data);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}

export const delInterestedEvent = async (eventObj) => {
  let url = DEL_INTERESTED_EVENT;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, eventObj, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res.data);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}

export const addParticipatedEvent = async (eventObj) => {
  let url = ADD_PARTICIPATED_EVENT;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, eventObj, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res.data);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}

export const delParticipatedEvent = async (eventObj) => {
  let url = DEL_PARTICIPATED_EVENT;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, eventObj, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res.data);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}