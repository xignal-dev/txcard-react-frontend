import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { useProvider, useCreateStore } from "mobx-store-provider";

import UserStore from "./_userStore";
import AuthStore from "./_authStore";
import OfficeStore from './_officeStore';
import TxStore from './_transactionStore';

// import AlertStore from "./smbAlertStore";
// import SettingsStore from "./smbSettingsStore";
// import FnaStore from "./smbFnaStore";
// import QnaStore from "./smbQnaStore";
// import WalletStore from './smbWalletStore';
// import OrderStore from './smbOrderStore';
// import NoticeStore from './smbNoticeStore';
// import BUserStore from './smbBUserStore';

export const RootStore = types.model('RootStore', {

  authStore: AuthStore,
  userStore: UserStore,
  officeStore: OfficeStore,
  txStore: TxStore,
});

// export const Stores = useCreateStore(RootStore, {
//   authStore: AuthStore.create(),
//   userStore: UserStore.create(),
//   alertStore: AlertStore.create(),
//   settingsStore: SettingsStore.create(),
//   marketStore: MarketStore.create(),
// } );

const Stores = RootStore.create({
  authStore: AuthStore.create(),
  userStore: UserStore.create(),
  txStore: TxStore.create(),
  officeStore: OfficeStore.create(),
});

// stores['socketStore'] = socketStore;

export default Stores;