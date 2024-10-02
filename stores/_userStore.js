import { getParent, types } from 'mobx-state-tree';
import { observable, action } from "mobx";
// import agent from "../app/utils/agent";
import apiCtrl from '../utils/api';


const UserStore = observable(types.model('UserStore', {
  cmNo: types.optional(types.number, 0),
  cmId: types.optional(types.string, ''),
  cmPassword: types.optional(types.string, ''),
  cmName: types.optional(types.string, ''),
  cmEmail: types.optional(types.string, ''),
  cmLevel: types.optional(types.number, 0),
  cmTel: types.optional(types.string, ''),
  cmCertify: types.optional(types.string, ''),
  cmZipcode: types.optional(types.string, ''),
  cmAddr1: types.optional(types.string, ''),
  cmAddr2: types.optional(types.string, ''),
  cmAddr3: types.optional(types.string, ''),
  cmOffice: types.optional(types.string, ''),
  cmGcash: types.optional(types.number, 0),
  cmPbe: types.optional(types.string, ''),
  cmUsdt: types.optional(types.string, ''),
  cmEpoint: types.optional(types.number, 0),
  cmBtcAdd: types.optional(types.string, ''),
  cmEthAdd: types.optional(types.string, ''),
  cmPbeAdd: types.optional(types.string, ''),
  cmRegdate: types.optional(types.string, ''),
  cmLogindate: types.maybeNull(types.string, ''),
  cmLoginIp: types.optional(types.string, ''),
  cmRegIp: types.optional(types.string, ''),
  cmLeaveDate: types.optional(types.string, ''),
  cmInterceptDate: types.optional(types.string, ''),
  cmEmailCertify: types.maybeNull(types.string, ''),
  cmEmailCertify2: types.optional(types.string, ''),
  cmMemo: types.optional(types.string, ''),
  cmCardNumber: types.optional(types.string, ''),
  cmBankName: types.optional(types.string, ''),
  cmBankAccount: types.optional(types.string, ''),
  cmBankAccountName: types.optional(types.string, ''),

}).actions(self => ({
  setUser(profile) {
    self.cmNo = profile.cmNo;
    self.cmId = profile.cmId;
    self.cmPassword = profile.cmPassword;
    self.cmName = profile.cmName;
    self.cmEmail = profile.cmEmail;
    self.cmLevel = profile.cmLevel;
    self.cmTel = profile.cmTel;
    self.cmCertify = profile.cmCertify;
    self.cmZipcode = profile.cmZipcode;
    self.cmAddr1 = profile.cmAddr1;
    self.cmAddr1 = profile.cmAddr1;
    self.cmAddr3 = profile.cmAddr3;
    self.cmOffice = profile.cmOffice;
    self.cmGcash = profile.cmGcash;
    self.cmPbe = profile.cmPbe;
    self.cmUsdt = profile.cmUsdt;
    self.cmEpoint = profile.cmEpoint;
    self.cmBtcAdd = profile.cmBtcAdd;
    self.cmEthAdd = profile.cmEthAdd;
    self.cmPbeAdd = profile.cmPbeAdd;
    self.cmRegdate = profile.cmRegdate;
    self.cmLogindate = profile.cmLogindate;
    self.cmLoginIp = profile.cmLoginIp;
    self.cmRegIp = profile.cmRegIp;
    self.cmLeaveDate = profile.a;
    self.cmInterceptDate = profile.cmInterceptDate;
    self.cmEmailCertify = profile.cmEmailCertify;
    self.cmEmailCertify2 = profile.cmEmailCertify2;
    self.cmMemo = profile.cmMemo;
    self.cmCardNumber = profile.cmCardNumber;
    self.cmBankName = profile.cmBankName;
    self.cmBankAccount = profile.cmBankAccount;
    self.cmBankAccountName = profile.cmBankAccountName;
  },
  destroyUser() {
    self.cmNo = 0;
    self.cmId = '';
    self.cmPassword = '';
    self.cmName = '';
    self.cmEmail = '';
    self.cmLevel = 0;
    self.cmTel = '';
    self.cmCertify = '';
    self.cmZipcode = '';
    self.cmAddr1 = '';
    self.cmAddr2 = '';
    self.cmAddr3 = '';
    self.cmOffice = '';
    self.cmGcash = 0;
    self.cmPbe = '';
    self.cmUsdt = '';
    self.cmEpoint = 0;
    self.cmBtcAdd = '';
    self.cmEthAdd = '';
    self.cmPbeAdd = '';
    self.cmRegdate = '';
    self.cmLogindate = '';
    self.cmLoginIp = '';
    self.cmRegIp = '';
    self.cmLeaveDate = '';
    self.cmInterceptDate = '';
    self.cmEmailCertify = '';
    self.cmEmailCertify2 = '';
    self.cmMemo = '';
    self.cmCardNumber = '';
    self.cmBankName = '';
    self.cmBankAccount = '';
    self.cmBankAccountName = '';
  },

  async getProfile() {
    await apiCtrl.getProfile().then(async response => {
      try {
        let data = response.data;
        if(data.accessToken) {
          data = await apiCtrl.getProfile().data;
        }
        self.setUser(data.profile);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      getParent(self).authStore.signout();
      console.log(e);
    });
  },

})).views(self => ({

})));

export default UserStore;
