import React from 'react';
import 'url-search-params-polyfill';

import { postWithoutToken } from '../api/apiHelper';


export const authenticate = (email, password) => {
  const requestBody = {
    email: email,
    password: password,
  }
  return postWithoutToken('/authentication/authenticate', requestBody);
}

export const signUp = (email, password) => {
  const requestBody = {
    email: email,
    password: password,
  }
  return postWithoutToken('/authentication', requestBody);
}

export const verify = (email, password, verificationCode) => {
  const requestBody = {
    email: email,
    password: password,
    verificationCode: verificationCode,
  }
  return postWithoutToken('/authentication/verify', requestBody);
}
