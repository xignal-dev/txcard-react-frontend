import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";

const History = types.model("History", {
  id: types.optional(types.number, 0),
  user_id: types.optional(types.number, 0),
  account_id: types.optional(types.number, 0),
  settlement_id: types.optional(types.number, 0),
  status: types.optional(types.string, ''),
  price: types.optional(types.string, '0'),
  order_id: types.maybeNull(types.string, ''),
  asset_id: types.optional(types.number, 0),
  expiration_at: types.optional(types.string, ''),
  modified_at: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
});

const Asset = types.model("Asset", {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  symbol: types.optional(types.string, ''),
  listed_price: types.optional(types.string, '0'),
  totalSupply: types.optional(types.string, '0'),
  asset_type: types.optional(types.string, ''),
  state: types.optional(types.string, ''),
  valid: types.optional(types.string, 'false'),
  modified_at: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
});

const Account = types.model("Account", {
  id: types.optional(types.number, 0),
  symbol: types.optional(types.string, ''),
  balance: types.optional(types.string, '0'),
  user_id: types.optional(types.number, 0),
  asset_id: types.optional(types.number, 0),
  valid: types.optional(types.string, 'false'),
  modified_at: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
  asset: types.optional(Asset, {}),
  logo_img: types.optional(types.string, ''),
});

const AccountStore = observable(types.model("AccountStore", {
    accounts: types.map(Account),
    histories: types.map(History),
  }).actions(self => ({
    
    setAccounts(accounts) {
      // self.orders = orders;
      self.accounts.clear();
      accounts.forEach(account => {
        self.accounts.set(account.id, account);
      });
    },
    
    setAccountHistories(histories) {
      // self.orders = orders;
      self.accounts.clear();
      histories.forEach(history => {
        self.histories.set(history.id, history);
      });
    },
    
    async getAccounts() {
      await apiCtrl.getAccounts().then(response => {
        try {
          self.setAccounts(response.data.accounts);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    
    async getAccountHistories(assetId) {
      await apiCtrl.getAccountHistories(assetId).then(response => {
        try {
          self.setAccountHistories(response.data.histories);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    
  })).views(self => ({
    

    get accountList() {
      return values(self.accounts);
    },
    
    get historyList() {
      return values(self.histories);
    },
  
  })));

export default AccountStore;