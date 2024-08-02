import { types } from 'mobx-state-tree';
import { observable, action, values } from "mobx";
import apiCtrl from '../utils/api';

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

const MenuStore = observable(types.model('MenuStore', {
  categories: types.array(Category, []),
}).actions(self => ({
  
  setCategories(categories) {
    self.categories = categories;
  },
  
  async getBusinessMenus() {
    await apiCtrl.getBusinessMenus().then(response => {
      try {
        console.log(response.data.menu);
        self.setCategories(response.data.menu);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    });
  },
    
  // category
  async addProductCategory(name) {
    let data = { name: name };
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
  
  async updateProductCategory(categoryId, categoryName) {
    let data = { name: name };
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
  
  // product
  async addProduct(categoryId, name, price, file) {
    const data = new FormData();
    data.append('name', name);
    data.append('price', price);
    data.append('product_img', file);
    
    await apiCtrl.addProduct(categoryId, data).then(response => {
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
  
  async subProduct(productId) {
    await apiCtrl.subProduct(productId).then(response => {
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
  
  async updateProductImage(productId, file) {
    const data = new FormData();
    data.append('file', file);
    await apiCtrl.updateProductImage(productId, data).then(response => {
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
  
  async updateProduct(productId, data) {
    await apiCtrl.updateProduct(productId, data).then(response => {
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
  
  // check item
  async addProductCheckItem(optionId, name, price) {
    let data = { name: name, price: price };
    await apiCtrl.addProductCheckItem(optionId, data).then(response => {
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
  
  async subProductCheckItem(itemId) {
    await apiCtrl.subProductCheckItem(itemId).then(response => {
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
  
  async updateProductCheckItem(itemId, name, price) {
    let data = { name: name, price: price };
    await apiCtrl.updateProductCheckItem(itemId, data).then(response => {
      try {
        // console.log(response.data);0
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    });
  },
  
  // radio option
  async addProductRadioOption(productId, name) {
    let data = { name: name };
    await apiCtrl.addProductRadioOption(productId, data).then(response => {
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
  
  async subProductRadioOption(optionId) {
    await apiCtrl.subProductRadioOption(optionId).then(response => {
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
  
  async updateProductRadioOption(optionId, name) {
    let data = { name: name };
    await apiCtrl.updateProductRadioOption(optionId, data).then(response => {
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
  
  // radio item
  async addProductRadioItem(optionId, name, price) {
    let data = { name: name, price: price };
    await apiCtrl.addProductRadioItem(optionId, data).then(response => {
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
  
  async subProductRadioItem(itemId) {
    await apiCtrl.subProductRadioItem(itemId).then(response => {
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
  
  async updateProductRadioItem(itemId, name, price) {
    let data = { name: name, price: price };
    await apiCtrl.updateProductRadioItem(itemId, data).then(response => {
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

})));

export default MenuStore;
