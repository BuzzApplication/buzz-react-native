import React from 'react';
import 'url-search-params-polyfill';

import { get, post } from '../api/apiHelper';


export const getReportCategories = () => {
  return get('/user/report/category');
}

export const submitReport = (type, reportCategoryId, itemId) => {
  const requestBody = {
    type: type,
    reportCategoryId: reportCategoryId,
    itemId: itemId,
  }
  return post('/user/report', requestBody);
}
