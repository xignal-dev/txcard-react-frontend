import { types } from "mobx-state-tree";
import { observable, action } from "mobx";
// import i18n from '../i18n/i18n';
// import { setItemToAsync } from "../utils/asyncStorage";

const SettingsStore = observable(types.model("SettingsStore", {
    authenticationStatus: types.optional(types.string, "IN_PROGRESS"),
    userName: types.optional(types.string, "not authrizaion."),
    locale: types.optional(types.string, 'kr'),
    exchangeActiveTab: types.optional(types.string, 'ORDER'),
    subscriptionActiveTab: types.optional(types.string, 'STATUS'),
    investmentActiveTab: types.optional(types.string, 'TOTAL'),
    investmentPeriod: types.optional(types.string, 'ONE'),
    infoActiveTab: types.optional(types.string, 'BUILDING'),
    quoteActiveTab: types.optional(types.string, 'CHART')
  })
  .actions((self) => ({
    changeLocale(locale) {
      self.locale = locale;
      // i18n.changeLanguage(locale);

      window.localStorage.setItem('locale', locale);
    },

    setExchangeActiveTab(tab) {
      self.exchangeActiveTab = tab;
    },

    setSubscriptionActiveTab(tab) {
      self.subscriptionActiveTab = tab;
    },

    setInvestmentActiveTab(tab) {
      self.investmentActiveTab = tab;
    },

    setInvestmentPeriod(period) {
      self.investmentPeriod = period;
    },

    setInfoActiveTab(tab) {
      self.infoActiveTab = tab;
    },

    setQuoteActiveTab(tab) {
      self.quoteActiveTab = tab;
    }

  }))
  .views((self) => ({})));

export default SettingsStore;
