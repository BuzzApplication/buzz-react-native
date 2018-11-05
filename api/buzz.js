import React from 'react';
import 'url-search-params-polyfill';

import { get, post } from '../api/apiHelper';


export const getBuzzList = (companyIds) => {
  var searchParams = new URLSearchParams();
  for (let companyId of companyIds) {
    searchParams.append('companyIds', companyId);
  }
  return get('/user/buzz' + '?' + searchParams);
}

export const getPostedBuzz = () => {
  return get('/user/buzz/posted');
}

export const postBuzz = (text, companyId, userEmailId, anonymous) => {
  const requestBody = {
    text: text,
    companyId: companyId,
    userEmailId: userEmailId,
    anonymous: anonymous,
  }
  return post('/user/buzz', requestBody);
}

export const likeBuzz = (buzzIds, liked) => {
  const requestBody = {
    buzzId: buzzIds,
    liked: liked,
  }
  return post('/user/buzz/like', requestBody);
}

export const getFavoriteBuzz = () => {
  return get('/user/buzz/favorite');
}

export const favoriteBuzz = (buzzIds, favorited) => {
  const requestBody = {
    buzzId: buzzIds,
    favorited: favorited,
  }
  return post('/user/buzz/favorite', requestBody);
}
export const getTrendingBuzz = () => {
  return get('/user/buzz/trending');
}
