import { AsyncStorage } from 'react-native';
import { tokenKey } from './api/constants';


export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(tokenKey)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}
