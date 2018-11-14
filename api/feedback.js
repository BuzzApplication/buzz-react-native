import React from 'react';
import DeviceInfo from 'react-native-device-info';
import 'url-search-params-polyfill';

import { get, post } from '../api/apiHelper';


export const submitFeedback = (text) => {
  const requestBody = {
    text: text,
    version: DeviceInfo.getVersion(),
    userAgent: DeviceInfo.getUserAgent(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    carrier: DeviceInfo.getCarrier(),
    ipAddr: DeviceInfo.getIPAddress(),
    locale: DeviceInfo.getDeviceLocale(),
  }
  return post('/user/feedback', requestBody);
}
