import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { useProvider, useCreateStore } from "mobx-store-provider";

import UserStore from "./smbUserStore";
import MarketStore from "./smbMarketStore";
import AuthStore from "./smbAuthStore";
import AlertStore from "./smbAlertStore";
import SettingsStore from "./smbSettingsStore";
import FnaStore from "./smbFnaStore";
import QnaStore from "./smbQnaStore";
import WalletStore from './smbWalletStore';
import OrderStore from './smbOrderStore';
import MenuStore from './smbMenuStore';
import AccountStore from './smbAccountStore';
import NoticeStore from './smbNoticeStore';
import BUserStore from './smbBUserStore';

export const RootStore = types.model('RootStore', {

  authStore: AuthStore,
  userStore: UserStore,
  bUserStore: BUserStore,
  alertStore: AlertStore,
  settingsStore: SettingsStore,
  marketStore: MarketStore,
  FnaStore: FnaStore,
  QnaStore: QnaStore,
  WalletStore: WalletStore,
  orderStore: OrderStore,
  menuStore: MenuStore,
  accountStore: AccountStore,
  NoticeStore: NoticeStore,
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
  bUserStore: BUserStore.create(),
  alertStore: AlertStore.create(),
  settingsStore: SettingsStore.create(),
  marketStore: MarketStore.create(),
  FnaStore: FnaStore.create(),
  QnaStore: QnaStore.create(),
  WalletStore: WalletStore.create(),
  orderStore: OrderStore.create(),
  menuStore: MenuStore.create(),
  accountStore: AccountStore.create(),
  NoticeStore: NoticeStore.create(),
});

// stores['socketStore'] = socketStore;

export default Stores;