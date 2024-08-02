import { types } from 'mobx-state-tree';
import { observable, action } from "mobx";
// import agent from "../app/utils/agent";
import apiCtrl from '../utils/api';


const UserStore = observable(types.model('UserStore', {
  id: types.optional(types.number, 0),
  email: types.optional(types.string, ''),
  nick: types.maybeNull(types.string, ''),
  name: types.maybeNull(types.string, ''),
  nation: types.maybeNull(types.string, ''),
  phone: types.maybeNull(types.string, ''),
  recommend_id: types.maybeNull(types.number, 0),
  grade: types.optional(types.string, ''),
  login_kind: types.optional(types.string, ''),
  valid: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
}).actions(self => ({
  setUser(profile) {
    self.id = profile.id;
    self.email = profile.email;
    self.nick = profile.nick ? profile.nick : '';
    self.name = profile.name ? profile.name : '';
    self.nation = profile.nation ? profile.nation : '';
    self.phone = profile.phone ? profile.phone : '';
    self.recommend_id = profile.recommend_id;
    self.grade = profile.grade;
    self.login_kind = profile.login_kind;
    self.valid = profile.valid;
    self.created_at = profile.created_at;
  },
  destroyUser() {
    self.id = 0;
    self.email = '';
    self.nick = '';
    self.name = '';
    self.nation = '';
    self.phone = '';
    self.class = '';
    self.grade = '';
    self.valid = '';
    self.created_at = '';
  },

  async getProfile() {
    await apiCtrl.getProfile().then(response => {
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

})).views(self => ({

})));

export default UserStore;
