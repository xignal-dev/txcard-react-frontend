import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";
import { type } from "os";

const OptionHistory = types.model("Basket", {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  user_id: types.optional(types.number, 0),
  menu_product_id: types.optional(types.number, 0),
  shopping_basket_id: types.optional(types.number, 0),
  valid: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
  menu_option_id: types.optional(types.number, 0),
});

const Basket = types.model("Basket", {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  table_id: types.optional(types.number, 0),
  user_id: types.optional(types.number, 0),
  order_history_id: types.optional(types.number, 0),
  menu_product_id: types.optional(types.number, 0),
  volume: types.optional(types.number, 0),
  price: types.optional(types.number, 0),
  status: types.optional(types.string, ''),
  valid: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
  option_histories: types.array(OptionHistory, []),
});

const Order = types.model("Order", {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  table_id: types.optional(types.number, 0),
  user_id: types.maybeNull(types.number, 0),
  status: types.optional(types.string, ''),
  valid: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
  payment_at: types.optional(types.string, ''),
  preparing_at: types.optional(types.string, ''),
  pickup_at: types.optional(types.string, ''),
  shopping_baskets: types.array(Basket, []),
});

const Table = types.model("Table", {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  table_number: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  valid: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
  modified_at: types.optional(types.string, ''),
});

const OrderDetail = types.model('OrderDetail', {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  menu_category_id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  price: types.optional(types.number, 0),
  product_img: types.optional(types.string, ''),
  description: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  valid: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''),
  volume: types.optional(types.number, 0),
  sum: types.optional(types.number, 0),
});

const TableOrderHistory = types.model('TableOrderHistory', {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  user_id: types.optional(types.number, 0),
  status: types.optional(types.string, ''),
  created_at: types.optional(types.string, ''), 
  payment_at: types.optional(types.string, ''), 
  preparing_at: types.optional(types.string, ''), 
  pickup_at: types.optional(types.string, ''),
  orderDetail: types.array(OrderDetail, []),
  market_name: types.optional(types.string, ''),
  logo_img: types.optional(types.string, ''),
  avd_img: types.optional(types.string, ''),
  total_price: types.optional(types.number, 0),
});

const OrderStore = observable(types.model("OrderStore", {
    orders: types.map(Order),
    tables: types.map(Table),
    tableOrderHistories: types.array(TableOrderHistory, []),
  }).actions(self => ({
    
    setOrders(orders) {
      // self.orders = orders;
      self.orders.clear();
      orders.forEach(order => {
        self.orders.set(order.id, order);
      });
    },
    
    setTables(tables) {
      // self.orders = orders;
      self.tables.clear();
      tables.forEach(table => {
        self.tables.set(table.id, table);
      });
    },
    
    setTableOrderHistories(histories) {
      self.tableOrderHistories.clear();
      
      histories.forEach((history) => {
        let temp = {
          id: history.id,
          business_users_id: history.business_users_id,
          status: history.status,
          created_at: history.created_at,
          payment_at: history.payment_at,
          preparing_at: history.preparing_at,
          pickup_at: history.pickup_at,
          shopping_baskets: history.shopping_baskets
        };
        self.tableOrderHistories.push(temp);
      });    
    },
    
    async getOrders(orderId = 0) {
      await apiCtrl.getOrders(orderId).then(response => {
        try {
          console.log(response.data.orders);
          self.setOrders(response.data.orders);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    
    async getTables() {
      await apiCtrl.getTables().then(response => {
        try {
          // console.log(response.data.tables);
          self.setTables(response.data.tables);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    
    async getTableOrderHistories() {
      await apiCtrl.getTableOrderHistories().then(response => {
        try {
          // console.log(response.data.orders);
          self.setTableOrderHistories(response.data.orders);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      })
    },
    
    async updateTableOrder(data, basketId) {
      await apiCtrl.updateTableOrder(data, basketId).then(response => {
        try {
          console.log(response.data);
          // self.setTableOrderHistories(response.data.orders);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      })
    },
    
    async setPGOrder(order, merchantId) {
      return await apiCtrl.setPGOrder(order, merchantId).then(response => {
        try {
          // console.log(response.data);
          return response.data;
        } catch (e) {
          console.log(e);
          return Promise.reject();
        }
      })
      .catch(e => {
        console.log(e);
        return Promise.reject();
      })
    },
    
  })).views(self => ({
    
    // get curOrderList() {
    //   return values(self.orders);
    // },
    
    get orderList() {
      return values(self.orders);
    },
    
    get tableList() {
      return values(self.tables);
    }
  
  })));

export default OrderStore;