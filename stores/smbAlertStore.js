import { types } from "mobx-state-tree";
import { observable, action } from "mobx";
// import i18n from '../i18n/i18n';

export const FORMAT = {
  ERROR: 'ERROR',
  WITH_TEXT: 'WITH_TEXT',
  WITH_SELECT: 'WITH_SELECT',
  CUSTOM: 'CUSTOM'
}

const AlertStore = observable(types.model("AlertStore", {
  alertType: '',
  customAlertName: '',
  title: '',
  content: '',
  message: '',
  isVisible: false,
}).volatile(self => ({
  defaults: {
    buttons: [{
      // name: i18n.t('Public.confirm')
    }],
    onClose: () => { }
  },
  buttons: [],
  onClose: null

})).actions((self) => ({
  clear() {
    self.setAlertType(FORMAT.ERROR);
    self.message = '';
    self.title = '';
    self.content = '';
    self.buttons = self.defaults.buttons;
    self.onClose = self.defaults.onClose;
  },

  close() {
    self.isVisible = false;
    self.clear();
  },

  open(message, callback) {
    console.log(message);
    self.message = message;
    self.isVisible = true;
    if (callback) {
      callback();
    }
  },

  setAlertType(type) {
    self.alertType = type;
  },

  openWithText({ title, content, onClose }) {
    self.setAlertType(FORMAT.WITH_TEXT);
    self.title = title;
    self.content = content;
    self.onClose = onClose || self.defaults.onClose;
    self.isVisible = true;
  },
  openWithSelect({ title, content, buttons, onClose }) {
    self.setAlertType(FORMAT.WITH_SELECT);
    self.title = title;
    self.content = content;
    self.buttons = buttons || self.defaults.buttons;
    self.onClose = onClose || self.defaults.onClose;
    self.isVisible = true;
  },
  openCustom({ alertName, title, content, buttons, onClose }) {
    self.setAlertType(FORMAT.CUSTOM);
    self.customAlertName = alertName;
    self.title = title;
    self.content = content;
    self.buttons = buttons || self.defaults.buttons;
    self.onClose = onClose || self.defaults.onClose;
    self.isVisible = true;
  }
})).views((self) => ({

})));

export default AlertStore;
