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
