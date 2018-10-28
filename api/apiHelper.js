import React from 'react';
import 'url-search-params-polyfill';

import { URL } from '../api/constants';

export const get = (path) => {
  const url = URL + path;
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMjFkZjdhYi02Y2Y0LTRhYmYtODI0ZS04NjYwMTQ1NzUwNDgiLCJzdWIiOiIwMjFkZjdhYi02Y2Y0LTRhYmYtODI0ZS04NjYwMTQ1NzUwNDgudHNqYWhqYUBidXp6LmNvbSIsImlzcyI6ImJ1enotYmFja2VuZCIsImlhdCI6MTU0MDQ1NzYyN30.GDn3p89mHaYoTBfnluiGOGRWOzVeB573rklB6_kaHpI',
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson
  })
  .catch(function(error) {
    console.log('request failed', error)
  });
};

export const post = (path, requestBody) => {
  console.log('requestBody: ', requestBody);
  const url = URL + path;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMjFkZjdhYi02Y2Y0LTRhYmYtODI0ZS04NjYwMTQ1NzUwNDgiLCJzdWIiOiIwMjFkZjdhYi02Y2Y0LTRhYmYtODI0ZS04NjYwMTQ1NzUwNDgudHNqYWhqYUBidXp6LmNvbSIsImlzcyI6ImJ1enotYmFja2VuZCIsImlhdCI6MTU0MDQ1NzYyN30.GDn3p89mHaYoTBfnluiGOGRWOzVeB573rklB6_kaHpI',
    },
    body: JSON.stringify(requestBody),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    return responseJson
  })
  .catch(function(error) {
    console.log('request failed', error)
  });
};
