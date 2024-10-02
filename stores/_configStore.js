import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";

const ExchangeRate = types.model("ExchangeRate", {
  vnd: types.maybeNull(types.string, ''),
  usd: types.maybeNull(types.string, ''),
});

const ConfigStore = observable(types.model("ConfigStore", {
  exchangeRate: types.maybeNull(ExchangeRate),
  }).actions(self => ({
    
    setExchangeRate(data) {
      self.exchangeRate = data;
      console.log(self.exchangeRate);
      // self.exchangeRate.usd = data.usd;
    },
    
    async getExchangeRate() {
      await apiCtrl.getExchangeRate().then(async response => {
        try {
          let data = response.data;
          if(data.accessToken) {
            data = (await apiCtrl.getExchangeRate()).data;
          }
          self.setExchangeRate(data);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    
  })).views(self => ({    

    get officeList() {
      return values(self.offices).reverse();
    },
  
  })));

export default ConfigStore;