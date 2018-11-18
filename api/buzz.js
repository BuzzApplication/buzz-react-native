import React from 'react';
import 'url-search-params-polyfill';

import { get, post } from '../api/apiHelper';


export const getBuzzList = (companyIds, start=0, limit=10) => {
  var searchParams = new URLSearchParams();
  for (let companyId of companyIds) {
    searchParams.append('companyIds', companyId);
  }
  searchParams.append('start', start);
  searchParams.append('limit', limit);
  return get('/user/buzz' + '?' + searchParams);
}

export const getPostedBuzz = (start=0, limit=10) => {
  var searchParams = new URLSearchParams();
  searchParams.append('start', start);
  searchParams.append('limit', limit);
  return get('/user/buzz/posted' + '?' + searchParams);
}

export const getSearchedBuzz = (text, start=0, limit=10) => {
  var searchParams = new URLSearchParams();
  searchParams.append('text', text);
  searchParams.append('start', start);
  searchParams.append('limit', limit);
  return get('/user/buzz/search' + '?' + searchParams);
}

export const postBuzz = (text, companyId, userEmailId, anonymous, polls) => {
  const requestBody = {
    text: text,
    companyId: companyId,
    userEmailId: userEmailId,
    anonymous: anonymous,
    polls: polls,
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

export const getFavoriteBuzz = (start=0, limit=10) => {
  var searchParams = new URLSearchParams();
  searchParams.append('start', start);
  searchParams.append('limit', limit);
  return get('/user/buzz/favorite' + '?' + searchParams);
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
