import React from 'react';
import { AsyncStorage } from 'react-native';
import 'url-search-params-polyfill';

import { URL, tokenKey } from '../api/constants';

export const get = (path) => {
  const url = URL + path;
  return AsyncStorage.getItem(tokenKey).then((token) => {
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch(function(error) {
      console.log('request failed', error)
    });
  });
};

export const post = (path, requestBody) => {
  const url = URL + path;
  return AsyncStorage.getItem(tokenKey).then((token) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch(function(error) {
      console.log('request failed', error)
    });
  });
};

export const postWithoutToken = (path, requestBody) => {
  console.log('requestBody: ', requestBody);
  const url = URL + path;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson
  })
  .catch(function(error) {
    console.log('request failed', error)
  });
};
