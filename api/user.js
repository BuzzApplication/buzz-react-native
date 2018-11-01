import React from 'react';
import 'url-search-params-polyfill';

import { get, post } from '../api/apiHelper';


export const getUserEmail = () => {
  return get('/user/email')
}

export const getUser = () => {
  return get('/user')
}

export const createUser = () => {
  return post('/user', null)
}
