import { types } from 'mobx-state-tree';
import { observable, action } from "mobx";
// import agent from "../app/utils/agent";
import apiCtrl from '../utils/api';


const BUserStore = observable(types.model('BUserStore', {
  id: types.optional(types.number, 0),
  business_ID: types.optional(types.string, ''),
  nation: types.maybeNull(types.string, ''),
  ordered_no: types.maybeNull(types.string, ''),
  membership_id: types.maybeNull(types.string, ''),
  membership_biz_no: types.maybeNull(types.string, ''),
  address: types.maybeNull(types.string, ''),
  name: types.maybeNull(types.string, ''),
  phone: types.maybeNull(types.string, ''),
  type: types.maybeNull(types.string, ''),
  description: types.maybeNull(types.string, ''),
  class: types.maybeNull(types.string, ''),
  grade: types.maybeNull(types.string, ''),
  valid: types.maybeNull(types.string, ''),
  created_at: types.maybeNull(types.string, ''),
  modified_at: types.maybeNull(types.string, ''),
  logo_img: types.maybeNull(types.string, ''),
  avd_img: types.maybeNull(types.string, ''),
  last_login_at: types.maybeNull(types.string, ''),
}).actions(self => ({
  setUser(profile) {
    self.id = profile.id;
    self.business_ID = profile.business_ID;
    self.nation = profile.nation;
    self.ordered_no = profile.ordered_no;
    self.membership_id = profile.membership_id;
    self.membership_biz_no = profile.membership_biz_no;
    self.address = profile.address;
    self.name = profile.name;
    self.phone = profile.phone;
    self.type = profile.type;
    self.description = profile.description;
    self.class = profile.class;
    self.grade = profile.grade;
    self.valid = profile.valid;
    self.created_at = profile.created_at;
    self.modified_at = profile.modified_at;
    self.logo_img = profile.logo_img;
    self.avd_img = profile.avd_img;
    self.last_login_at = profile.last_login_at;
  },
  destroyUser() {
    self.id = 0;
    self.business_ID = '';
    self.nation = '';
    self.ordered_no = '';
    self.membership_id = '';
    self.membership_biz_no = '';
    self.address = '';
    self.name = '';
    self.phone = '';
    self.type = '';
    self.description = '';
    self.description = '';
    self.name = '';
    self.nation = '';
    self.phone = '';
    self.class = '';
    self.grade = '';
    self.valid = '';
    self.created_at = '';
    self.modified_at = '';
    self.logo_img = '';
    self.avd_img = '';
    self.last_login_at = '';
  },

  async getBusinessProfile() {
    await apiCtrl.getBusinessProfile().then(response => {
      try {
        let data = response.data;
        console.log(data.profile);
        self.setUser(data.profile);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  async updateBusinessProfile(businessId, storeName, phoneNo, file = '', oldPw = '', newPw = '') {
    const data = new FormData();
    data.append('businessId', businessId);
    data.append('storeName', storeName);
    data.append('phoneNo', phoneNo);
    
    if(oldPw !== '') {
      data.append('oldPw', oldPw);
      data.append('newPw', newPw);
    }
    
    if(file !== '') {
      data.append('file', file);
    }
    
    // console.log(data.values);
    
    await apiCtrl.updateBusinessProfile(data).then(response => {
      try {
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  }

})).views(self => ({

})));

export default BUserStore;
