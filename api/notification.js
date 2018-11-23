import React from 'react';
import 'url-search-params-polyfill';

import { get, post } from '../api/apiHelper';


export const getNotification = () => {
  return get('/user/notification')
}
