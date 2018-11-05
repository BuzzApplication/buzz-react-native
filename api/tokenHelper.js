import React from 'react';
import { AsyncStorage } from 'react-native';
import 'url-search-params-polyfill';

import { URL, tokenKey } from '../api/constants';


export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(tokenKey, token);
  } catch (error) {
    console.log('Error storing token ', error)
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(tokenKey);
  } catch (error) {
    console.log('Error removing token ', error)
  }
}
