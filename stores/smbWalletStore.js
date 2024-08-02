import { types } from 'mobx-state-tree';
import { observable, action } from "mobx";
// import agent from "../app/utils/agent";
import apiCtrl from '../utils/api';


const WalletStore = observable(types.model('WalletStore', {
  id: types.optional(types.number, 0),
  symbol: types.optional(types.string, ''),
  user_id: types.optional(types.number, 0),
  asset_id: types.optional(types.number, 0),
  created_at: types.optional(types.string, ''),
  modified_at: types.optional(types.string, ''),
}).actions(self => ({
  setPoint(wallet) {
    self.id = wallet.id;
    self.symbol = wallet.symbol;
    self.user_id = wallet.user_id;
    self.asset_id = wallet.asset_id;
    self.created_at = wallet.created_at;
    self.modified_at = wallet.modified_at;
  },
  destroyPoint() {
    self.id = 0;
    self.symbol = '';
    self.user_id = 0;
    self.asset_id = 0;
    self.created_at = '';
    self.modified_at = '';
  },

  async getWallet() {
    await apiCtrl.getWallet().then(response => {
        try {
          let data = response.data;
          console.log(data.wallet);
          self.setUser(data.wallet);
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

export default WalletStore;
