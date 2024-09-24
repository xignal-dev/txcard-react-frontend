import { getParent, types } from 'mobx-state-tree';
import { observable, action } from "mobx";
import Router from 'next/router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getItemFromAsync, setItemToAsync } from '../utils/asyncStorage';
import apiCtrl from '../utils/api';


const AuthStore = observable(types.model('AuthStore', {
  businessId: types.optional(types.number, 0),
  userId: types.optional(types.number, 0),
  accessToken: types.optional(types.string, ''),
  uuid: types.optional(types.string, ''),
  authenticationStatus: types.optional(types.string, 'IN_PROGRESS'), // SUCCESS, FAILED, IN_PROGRESS
  userEmail: types.optional(types.string, ''),
  businessCode: types.optional(types.string, ''),
}).actions(self => ({

  async setUserId(userId) {
    self.userId = userId;
    window.localStorage.setItem('userId', userId);
  },
  async setAccessToken(accessToken) {
    self.accessToken = accessToken;
    window.localStorage.setItem('accessToken', accessToken);
  },
  async setRefreshTokenn(refreshToken) {
    self.refreshToken = refreshToken;
    window.localStorage.setItem('refreshToken', refreshToken);
  },
  async setUserUuid(uuid) {
    self.uuid = uuid;
    window.localStorage.setItem('userUuid', uuid);
  },
  async setUserEmail(userEmail) {
    self.userEmail = userEmail;
    window.localStorage.setItem('userEmail', userEmail);
  },
  async setAuthenticationStatus(status) {
    self.authenticationStatus = status;
    window.localStorage.setItem('authenticationStatus', status);
  },
  async destroyAccessToken() {
    self.accessToken = '';
    window.localStorage.setItem('accessToken', '');
  },
  async destroyRefreshToken() {
    self.refreshToken = '';
    window.localStorage.setItem('refreshToken', '');
  },
  async destroyUserUuid() {
    self.uuid = '';
    window.localStorage.setItem('userUuid', '');
  },
  async destroyUserEmail() {
    self.email = '';
    window.localStorage.setItem('userEmail', '');
  },
  async destroyAuthenticationStatus() {
    self.authenticationStatus = 'IN_PROGRESS';
    window.localStorage.setItem('authenticationStatus', 'IN_PROGRESS');
  },

  signout() {
    apiCtrl.signout().then((response) => {
    }).catch(error => {
      console.log(error);
    });
    
    self.destroyAccessToken();
    self.destroyRefreshToken();
    self.destroyUserEmail();
    getParent(self).userStore.destroyUser();
    self.destroyAuthenticationStatus();
    Router.push({ pathname: '/' });
  },

  async authenticate() {
    let accessToken = window.localStorage.getItem('accessToken');

    if (accessToken) {
      console.log(accessToken);
      return await apiCtrl.getProfile().then((response) => {
        // console.log(response);
        let data = response.data;
        getParent(self).userStore.setUser(data);
        self.setAuthenticationStatus('SUCCESS');
        console.log(data);
        return response;
      }).catch(error => {
        console.log(error);
        self.destroyAccessToken();
        // self.destroyUserUuid();
        self.destroyUserEmail();
        getParent(self).userStore.destroyUser();
        self.setAuthenticationStatus('FAILED');
        return Promise.reject();
      });
    } else {
      getParent(self).userStore.destroyUser();
      self.setAuthenticationStatus('FAILED');
      return Promise.reject('No AccessToken');
    }
  },
  
})).views(self => ({
  
  get getUerId() {
    return window.localStorage.getItem('userId');
  },
  get getUuid() {
    return window.localStorage.getItem('uuid');
  },
  get getUserEmail() {
    return window.localStorage.getItem('userEmail');
  },
  get authStatus() {
    return window.localStorage.getItem('authenticationStatus');
  },
  
})));

export default AuthStore;
