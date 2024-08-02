import { types } from 'mobx-state-tree';
import { observable, action, values } from "mobx";
// import agent from "../app/utils/agent";
import apiCtrl from '../utils/api';

const Market = types.model('Market', {
  // const MarketStore = types.model('MarketStore', {
  id: types.optional(types.number, 0),
  name: types.maybeNull(types.string, ''),
  address: types.maybeNull(types.string, ''),
  phone: types.maybeNull(types.string, ''),
  type: types.optional(types.string, ''),
  description: types.maybeNull(types.string, ''),
  logo_img: types.optional(types.string, ''),
  avd_img: types.optional(types.string, ''),
});

const MenuOptions = types.model('MenuOptions', {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  menu_product_id: types.optional(types.number, 0),
  option_category_id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  value: types.optional(types.boolean, false),
  price: types.optional(types.number, 0),
  volume: types.optional(types.string, ''),
  valid: types.optional(types.string, ''),
});

const OptionCategory = types.model('OptionCategory', {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  menu_product_id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  type: types.optional(types.string, ''),
  valid: types.optional(types.string, ''),
  menu_options: types.array(MenuOptions, []),
});

const Product = types.model('Product', {
  // const MarketStore = types.model('MarketStore', {
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  price: types.optional(types.number, 0),
  product_img: types.optional(types.string, ''),
  description: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  valid: types.optional(types.string, ''),
  option_categories: types.array(OptionCategory, []),
});

const Category = types.model('Category', {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  category_name: types.optional(types.string, ''),
  menu_products: types.array(Product, []),
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

const MobileOrderHistory = types.model('MobileOrderHistory', {
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

const MarketEvent = types.model('MarketEvent', {
  id: types.optional(types.number, 0),
  business_users_id: types.optional(types.number, 0),
  status: types.optional(types.string, ''),
  type: types.optional(types.string, ''),
  value: types.maybeNull(types.string, ''),
  title: types.optional(types.string, ''), 
  content: types.optional(types.string, ''), 
  img_link: types.optional(types.string, ''), 
  created_at: types.optional(types.string, ''),
  start_at: types.optional(types.string, ''),
  expiration_at: types.optional(types.string, ''),
  joined: types.optional(types.boolean, false),
});

// const MarketStore = observable(types.model('MarketStore', {
const MarketStore = observable(types.model('MarketStore', {
  markets: types.map(Market),
  categories: types.array(Category, []),
  // mobileOrderHistories: types.array(MobileOrderHistory, []),
  mobileOrderHistories: types.map(MobileOrderHistory),
  events: types.map(MarketEvent),
}).actions(self => ({
  setMarkets(markets) {
    self.markets.clear();
    markets.forEach(market => {
      self.markets.set(market.id, market);
    });
  },
  setCategories(categories) {
    self.categories = categories;
  },
  // setMobileOrderHistories(mobileOrderHistories) {
  //   self.mobileOrderHistories.clear();
    
  //   mobileOrderHistories.forEach((mobileOrderHistory, idx) => {
  //     let temp = {
  //       id: mobileOrderHistory.id,
  //       business_users_id: mobileOrderHistory.business_users_id,
  //       status: mobileOrderHistory.status,
  //       created_at: mobileOrderHistory.created_at,
  //       payment_at: mobileOrderHistory.payment_at,
  //       preparing_at: mobileOrderHistory.preparing_at,
  //       orderDetail: mobileOrderHistory.orderDetail,
  //       market_name: mobileOrderHistory.market_name,
  //       logo_img: mobileOrderHistory.logo_img,
  //       avd_img: mobileOrderHistory.avd_img,
  //       total_price: mobileOrderHistory.total_price,
  //     };
  //     self.mobileOrderHistories.push(temp);
  //   });
  // },
  
  setMobileOrderHistories(mobileOrderHistories) {
    self.mobileOrderHistories.clear();
    mobileOrderHistories.forEach((mobileOrderHistory) => {
      self.mobileOrderHistories.set(mobileOrderHistory.id, mobileOrderHistory)
    });    
  },
  
  setMarketEvents(events) {
    self.events.clear();
    events.forEach(event => {
      self.events.set(event.id, event);
    });
  },

  async getMarkets() {
    await apiCtrl.getMarkets().then(response => {
      try {
        let data = response.data;
        // console.log(data.markets);
        self.setMarkets(data.markets);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  async getMenus(marketId) {
    await apiCtrl.getMenus(marketId).then(response => {
      try {
        let data = response.data;
        // console.log(data.menu);
        self.setCategories(data.menu);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  async setOrder(order, marketId = 0) {
    let ret = 0;
    
    if(marketId === 0) {
      ret = await apiCtrl.setTableOrder(order.bucket).then(response => {
        try {
          // console.log(response.data);
          return response.data.orderId;
        } catch (e) {
          console.log(e);
          return -1;
        }
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      await apiCtrl.setMobileOrder(marketId, order).then(response => {
        try {
          // console.log(response.data);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
    
    return ret;
  },
  
  async getMobileOrderHistories() {
    await apiCtrl.getMobileOrderHistories().then(response => {
      try {
        self.setMobileOrderHistories(response.data.menu);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  async getEvents() {
    await apiCtrl.getEvent().then(response => {
      try {
        console.log(response.data);
        self.setMarketEvents(response.data.events);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },

  async addEvent(title, content, expiration, type, value, file) {
    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('type', type);
    data.append('value', value);
    data.append('expiration_at', expiration);
    data.append('file', file);
    
    await apiCtrl.addEvent(data).then(response => {
      try {
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  
  async updateEvent(id, title, content, expiration, type, value, status, file) {
    const data = new FormData();
    data.append('id', id);
    data.append('title', title);
    data.append('content', content);
    data.append('type', type);
    data.append('value', value);
    data.append('status', status);
    data.append('expiration_at', expiration);
    data.append('file', file);
    
    await apiCtrl.updateEvent(data).then(response => {
      try {
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  async deleteEvent(eventId) {
    await apiCtrl.deleteEvent(eventId).then(response => {
      try {
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  async execEvent(eventId, data) {
    await apiCtrl.execEvent(eventId, data).then(response => {
      try {
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  async getMarketEvents(marketId) {
    await apiCtrl.getMarketEvents(marketId).then(response => {
      try {
        // console.log(response.data.event);
        self.setMarketEvents(response.data.event);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    })
  },
  
  async addProductCategory(categoryName) {
    let data = { name: categoryName };
    await apiCtrl.addProductCategory(data).then(response => {
      try {
        // console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    });    
  },
  
  async subProductCategory(categoryId) {
    await apiCtrl.subProductCategory(categoryId).then(response => {
      try {
        // console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    });    
  },
  
  async updateProductCategory(categoryId, newCategoryName) {
    let data = { name: newCategoryName };
    await apiCtrl.updateProductCategory(categoryId, data).then(response => {
      try {
        // console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    });    
  },

})).views(self => ({
  get marketList() {
    return values(self.markets);
  },
  get menuList() {
    // return values(self.categories);
    let tempCategories = [];
    
    values(self.categories).forEach(menuCategory => {
      let tempCategory = {
        id: menuCategory.id,
        business_users_id: menuCategory.business_users_id,
        category_name: menuCategory.category_name,
        menu_products: [],
      }
      
      menuCategory.menu_products.forEach(product => {
        let tempProduct = {
          id: product.id,
          name: product.name,
          option_categories: [],
          price: product.price,
          product_img: product.product_img,
          status: product.status,
          valid: product.valid,
        };
        
        product.option_categories.forEach(optionCategory => {
          let tempOption = [];
          
          optionCategory.menu_options.forEach(option => {
            tempOption.push({
              business_users_id: option.business_users_id,
              id: option.id,
              menu_product_id: option.menu_product_id,
              name: option.name,
              option_category_id: option.option_category_id,
              price: option.price,
              valid: option.valid,
              value: option.value,
              volume: option.volume,
            });
          });
          
          tempProduct.option_categories.push({
            business_users_id: optionCategory.business_users_id,
            id: optionCategory.id,
            menu_options: tempOption,
            menu_product_id: optionCategory.menu_product_id,
            name: optionCategory.name,
            type: optionCategory.type,
            valid: optionCategory.valid
          });
        });
        
        tempCategory.menu_products.push(tempProduct);
      });
      
      tempCategories.push(tempCategory);
    });
    
    return tempCategories;
  },
  get productList() {
    let temp = [];
    self.categories.forEach(category => {
      category.menu_products.forEach(prod => {
        temp.push(prod);
      });
    });
    // console.log(temp);
    return temp;
  },
  
  get eventList() {
    return values(self.events);
  },
  
  get orderedList() {
    return values(self.mobileOrderHistories).reverse();
  }
  
})));

export default MarketStore;
