import axios from 'axios';
import getToken from '../utils/getToken';
import {
  GETEVENT, GETEVENTFROMTODAY, GETEVENTBETWEENDATE,
} from './constants.api';

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

export const getSpecificEvent = async (event_id) => {
  let url = GETEVENT + "?event=" + event_id;
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

export const getEventsFromToday = async () => {
  let url = GETEVENTFROMTODAY;
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

export const getEventsBetweenDate = async (start, end) => {
  let url = GETEVENTBETWEENDATE + "?start=" + start + "&end=" + end;
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
