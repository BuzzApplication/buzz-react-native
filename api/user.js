import React from 'react';
import 'url-search-params-polyfill';

import { get } from '../api/apiHelper';


export const getUserEmail = () => {
  return get('/user/email')
}
