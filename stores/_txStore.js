import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";

const Transaction = types.model("tx", {
  ccNo: types.optional(types.number, 0),
  cmId: types.optional(types.string, ''),
  cmEmail: types.optional(types.string, ''),
  cmName: types.optional(types.string, ''),
  cmOffice: types.optional(types.string, ''),
  ccCardnum: types.optional(types.string, ''),
  ccCardacc: types.optional(types.string, ''),
  ccTxdate: types.optional(types.string, ''),
  ccAccnum: types.optional(types.string, ''),
  ccBankname: types.optional(types.string, ''),
  ccTxnum: types.optional(types.string, ''),
  ccAmount: types.optional(types.string, ''),
  ccFeevat: types.optional(types.string, ''),
  ccRunbal: types.optional(types.string, ''),
  ccRegdate: types.optional(types.string, ''),
  ccChkdate: types.maybeNull(types.string, ''),
  ccDiv: types.optional(types.string, ''),
  ccChk: types.maybeNull(types.string, ''),
});

const TxStore = observable(types.model("AccountStore", {
    transactions: types.map(Transaction),
  }).actions(self => ({
    
    setTransactions(txlist) {
      self.transactions.clear();
      txlist.forEach(tx => {
        self.transactions.set(tx.ccNo, tx);
      });
    },
    
    async getTransactions() {
      await apiCtrl.getTransactions().then(response => {
        try {
          console.log(response.data.txlist);
          self.setTransactions(response.data.txlist);
          console.log(self.transactions);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
  })).views(self => ({
    

    get txList() {
      return values(self.transactions).reverse();
    },
  
  })));

export default TxStore;