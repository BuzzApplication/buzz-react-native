import React from 'react';
import 'url-search-params-polyfill';

import { get, post } from '../api/apiHelper';


export const getCommentList = (buzzId) => {
  var searchParams = new URLSearchParams();
  searchParams.append('buzzId', buzzId);
  return get('/user/comment' + '?' + searchParams);
}

export const likeComment = (commentId, liked) => {
  const requestBody = {
    commentId: commentId,
    liked: liked,
  }
  return post('/user/comment/like', requestBody);
}

export const postComment = (text, buzzId, userEmailId) => {
  const requestBody = {
    text: text,
    buzzId: buzzId,
    userEmailId: userEmailId,
  }
  return post('/user/comment', requestBody);
}
