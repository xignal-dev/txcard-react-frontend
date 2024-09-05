import axios from 'axios';
import qs from 'qs';
import errorHelper, { handleErrorCode } from './errorHelper';
// import { getItemFromAsync } from "./asyncStorage";
import { isEmpty } from './utils';
// import Formdata from "form-data";

// const CENTRAL_API_ROOT = `http://localhost:8589`;
// const CENTRAL_API_ROOT = `https://apibiz.linkedkulture.cf`;
const CENTRAL_API_ROOT = process.env.NEXT_PUBLIC_CENTRAL_API_ENDPOINT + '/api';

class ApiCtrl {
  constructor(centralAPI) {
    this.axios = axios.create({
      centralAPI,
      // 아래 옵션이 없으면 params를 array로 넘길때 url에 key=value가 아닌 key[]=value 와 같은 식으로 parsing 됩니다.
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    });

    /*this.axios_trading = axios.create({
        tradingAPI,
        // 아래 옵션이 없으면 params를 array로 넘길때 url에 key=value가 아닌 key[]=value 와 같은 식으로 parsing 됩니다.
        paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
    });*/
  }
   
  // auth -- BEGIN

  async signup(signupInfo) {
    return this.axios.post(`${CENTRAL_API_ROOT}/auth/signup/`, signupInfo).catch(this._handleError);
  }

  async login(loginInfo) {
    return this.axios.post(`${CENTRAL_API_ROOT}/auth/signin/`, loginInfo).catch(this._handleError);
  }
  
  async reauthenticate() {
    const header = await this.requestReauth();
    return await this.axios.post(`${CENTRAL_API_ROOT}/auth/authorise/`, header).catch(this._handleError);
  }
  
  // auth -- END 
  
  // user -- BEGIN

  async getProfile() {
    const header = await this.requestConfig();
    return await this.axios.get(`${CENTRAL_API_ROOT}/user/profile/`, header).catch(this._handleErrorEx);
  }

  async authenticateEmail(data) {
    return this.axios.post(`${CENTRAL_API_ROOT}/users/emailAuthentication/`, data, { headers: { 'user-agent': 'MOBILE_APP' } }).catch((err) => {
      return err;
    });
  }

  async authNumberVerificate(data) {
    return this.axios.post(`${CENTRAL_API_ROOT}/users/emailAuthenticationVerification/`, data, { headers: { 'user-agent': 'MOBILE_APP' } }).catch((err) => {
      return err;
    });
  }

  // users -- END
  
  // transaction -- BEGIN

  async getTransactions() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/transaction/list/`, header);
  }
   
  // transaction -- END
  
  async getEvent() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/businessUsers/event`, header);
  }
  
  async addEvent(data) {
    const header = await this.requestConfig();
    header.headers["Content-Type"] = "form-data";    
    return this.axios.post(`${CENTRAL_API_ROOT}/businessUsers/event`, data, header);
  }
  
  async updateEvent(data) {
    const header = await this.requestConfig();
    header.headers["Content-Type"] = "form-data";    
    return this.axios.put(`${CENTRAL_API_ROOT}/businessUsers/event`, data, header);
  }
    
  async deleteEvent(eventId) {
    const header = await this.requestConfig();
    return this.axios.delete(`${CENTRAL_API_ROOT}/businessUsers/event/${eventId}`, header);
  }
  
  async execEvent(eventId, data) {
    const header = await this.requestConfig();
    return this.axios.put(`${CENTRAL_API_ROOT}/businessUsers/event/${eventId}/point`, data, header);
  }
  
  
  // account -- BEGIN
  
  async getAccounts() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/account/point`, header);
  }
  
  async getAccountHistories(assetId) {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/account/pointHistory/${assetId}`, header);
  }
  
  // account -- END
  
  // order -- BEGIN
  
  async getOrders(orderId) {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/orders/${orderId}`, header);
  }
    
  async setTableOrder(menuList) {
    const header = await this.requestConfig();
    return this.axios.post(`${CENTRAL_API_ROOT}/orders`, menuList, header).catch((err) => {
      return err;
    });
  }
  
  async updateTableOrder(data, basketId) {
    const header = await this.requestConfig();
    return this.axios.put(`${CENTRAL_API_ROOT}/orders/${basketId}`, data, header).catch((err) => {
      return err;
    });
  }
  
  async getTableOrderHistories() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/orders`, header);
  }
  
  async setPGOrder(data, merchantId) {
    const header = await this.requestConfig();
    return this.axios.post(`${CENTRAL_API_ROOT}/market/payment/${merchantId}`, data, header);
    // header.headers["Cache-Control"] = "no-cache";
    // return this.axios.post(`https://api.testpayup.co.kr/ap/api/payment/${merchantId}/order`, data, header);
  }
  
  // order -- END
  
  // market -- BEGIN
  
  async getMarkets() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/market`, header);
  }
  
  async getMenus(marketId) {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/market/${marketId}/menu`, header);
  }
    
  async getMarketEvents(marketId) {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/market/${marketId}/event`, header);
  }
  
  async setMobileOrder(marketId, order) {
    const header = await this.requestConfig();
    return this.axios.post(`${CENTRAL_API_ROOT}/market/${marketId}/menu`, order, header).catch((err) => {
      return err;
    });
  }
  
  async getMobileOrderHistories() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/market/detailOrder`, header);
  }

  
  // market -- END
    
  // menu -- BEGIN
  
  async getBusinessMenus() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/menu`, header);
  }
  
  // category
  async addProductCategory(data) {
    const header = await this.requestConfig();
    return this.axios.post(`${CENTRAL_API_ROOT}/menu/category`, data, header);
  }
  
  async subProductCategory(categoryId) {
    const header = await this.requestConfig();
    return this.axios.delete(`${CENTRAL_API_ROOT}/menu/category/${categoryId}`, header);
  }
  
  async updateProductCategory(categoryId, data) {
    const header = await this.requestConfig();
    return this.axios.put(`${CENTRAL_API_ROOT}/menu/category/${categoryId}`, data, header);
  }
  
  // product
  async addProduct(categoryId, data) {
    const header = await this.requestConfig();
    header.headers["Content-Type"] = "form-data";
    return this.axios.post(`${CENTRAL_API_ROOT}/menu/category/${categoryId}/product`, data, header);
  }
  
  async subProduct(productId) {
    const header = await this.requestConfig();
    return this.axios.delete(`${CENTRAL_API_ROOT}/menu/category/product/${productId}`, header);
  }
  
  async updateProductImage(productId, data) {
    const header = await this.requestConfig();
    header.headers["Content-Type"] = "form-data";
    return this.axios.put(`${CENTRAL_API_ROOT}/menu/category/product/${productId}/Image`, data, header);
  }
  
  async updateProduct(productId, data) {
    const header = await this.requestConfig();
    return this.axios.put(`${CENTRAL_API_ROOT}/menu/category/product/${productId}`, data, header);
  }
  
  // check item
  async addProductCheckItem(optionId, data) {
    const header = await this.requestConfig();
    return this.axios.post(`${CENTRAL_API_ROOT}/menu/product/option/${optionId}/checkItem`, data, header);
  }
  
  async subProductCheckItem(itemId) {
    const header = await this.requestConfig();
    return this.axios.delete(`${CENTRAL_API_ROOT}/menu/product/option/checkItem/${itemId}`, header);
  }
  
  async updateProductCheckItem(itemId, data) {
    const header = await this.requestConfig();
    return this.axios.put(`${CENTRAL_API_ROOT}/menu/product/option/checkItem/${itemId}`, data, header);
  }
  
  // radio option
  async addProductRadioOption(productId, data) {
    const header = await this.requestConfig();
    return this.axios.post(`${CENTRAL_API_ROOT}/menu/product/${productId}/option/radio`, data, header);
  }
  
  async subProductRadioOption(optionId) {
    const header = await this.requestConfig();
    return this.axios.delete(`${CENTRAL_API_ROOT}/menu/product/option/${optionId}/radio`, header);
  }
  
  async updateProductRadioOption(optionId, data) {
    const header = await this.requestConfig();
    return this.axios.put(`${CENTRAL_API_ROOT}/menu/product/option/${optionId}/radio`, data, header);
  }
  
  // radio item
  async addProductRadioItem(optionId, data) {
    const header = await this.requestConfig();
    return this.axios.post(`${CENTRAL_API_ROOT}/menu/product/option/${optionId}/radioItem`, data, header);
  }
  
  async subProductRadioItem(itemId) {
    const header = await this.requestConfig();
    return this.axios.delete(`${CENTRAL_API_ROOT}/menu/product/option/radioItem/${itemId}`, header);
  }
  
  async updateProductRadioItem(itemId, data) {
    const header = await this.requestConfig();
    return this.axios.put(`${CENTRAL_API_ROOT}/menu/product/option/radioItem/${itemId}`, data, header);
  }
  
  // menu -- END

  // FAQ -- BEGIM
  
  async getFnaMainGuide() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/notice/fnaMainGuide`, header);
  }

  async getFrequentlyQuestions() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/notice/frequentlyQuestions`, header);
  }

  async inquiryNotice() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/notice/inquiryNotice`, header);
  }
  
  // FAQ -- END
  
  // FAQ -- BEGIM
  
  async getQnaList() {
    const header = await this.requestConfig();
    return this.axios.get(`${CENTRAL_API_ROOT}/notice/getQnaList`, header);
  }
    
    // const formData = new FormData();
    // formData.append('value1', value1);
    // formData.append('value2', value2);
    
    // let qna = {
    //   title: inquiryTitle,
    //   content: inquiryContent,
    //   content_file: '',
    //   status:'unanswered',
    //   created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   answer_created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    // }

  async postQna(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('content_file', data.content_file);
    formData.append('status', data.status);
    formData.append('created_at', data.created_at);
    formData.append('created_at', data.answer_created_at);
    const header = await this.requestConfig();
    // const header = await this.requestConfigForFilePost();
    return this.axios.post(`${CENTRAL_API_ROOT}/notice/postQna`, formData, header).catch((err) => {
      return err;
    });
  }
    
  // FAQ -- END

  async get(url, params = {}, withConfig = true) {
    // if (typeof url === 'string') url = url.replace('http:', 'https:');
    const config = withConfig ? await this.requestConfig() : {};

    // console.log('async get', config);

    let accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      return this.axios
        .get(url, { params, ...config })
        .catch(this._handleError);
    } else {
      return Promise.reject();
    }
  }

  async put(url, body) {
    let accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      return this.axios
        .put(url, body, await this.requestConfig())
        .catch(this._handleError);
    } else {
      return Promise.reject();
    }
  }

  async patch(url, body) {
    let accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      return this.axios
        .patch(url, body, await this.requestConfig())
        .catch(this._handleError);
    } else {
      return Promise.reject();
    }
  }

  async post(url, body) {
    let accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      return this.axios
        .post(url, body, await this.requestConfig())
        .catch(this._handleError);
    } else {
      return Promise.reject();
    }
  }

  async delete(url, body, withConfig = true) {
    const config = withConfig ? await this.requestConfig() : {};
    let accessToken = window.localStorage.getItem('accessToken');

    if (accessToken) {
      return this.axios
        .delete(url, { data: body, ...config })
        .catch(this._handleError);
    } else {
      return Promise.reject();
    }
  }

  async postFile(url, file) {
    let accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      return this.axios
        .post(url, file, await this.requestConfigForFilePost())
        .catch(this._handleError);
    } else {
      return Promise.reject();
    }
  }

  async requestConfig() {
    let requestConfig = { headers: {} };
    let accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      // console.log(accessToken);
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      requestConfig.headers["Cache-Control"] = "no-cache";
      // requestConfig.headers["user-agent"] = "MOBILE_APP";
    }
    return requestConfig;
  }
  
  async requestReauth() {
    let requestConfig = { headers: {} };
    let refreshToken = window.localStorage.getItem('refreshToken');
    if (refreshToken) {
      // console.log(refreshToken);
      requestConfig.headers.Authorization = `Bearer ${refreshToken}`;
      requestConfig.headers["Cache-Control"] = "no-cache";
      // requestConfig.headers["user-agent"] = "MOBILE_APP";
    }
    return requestConfig;
  }

  async requestConfigForFilePost() {
    let requestConfig = null;
    let accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      requestConfig = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      };
    }
    return requestConfig;
  }

  async _handleError(err) {
    if (!err.response) {
      throw err;
    }
    errorHelper.handleErrorCode(err.response);
    console.log('handle error : ', err.response);
    throw err;
  }
  
  async _handleErrorEx(err) {
    if (!err.response) {
      throw err;
    }
    console.log('handle error : ', err.response.data.message);
    if(err.response.data.message !== 'access token expired') {
      throw err;
    } else {
      let header = { headers: {} };
      let refreshToken = window.localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw err;
      } else {
        // console.log(refreshToken);
        header.headers.Authorization = `Bearer ${refreshToken}`;
        header.headers["Cache-Control"] = "no-cache";
        const res = await axios.post(`${CENTRAL_API_ROOT}/auth/authorise/`, header).catch(authErr => {
          console.log('handle error : ', authErr.response.data.message);
          throw authErr;
        });
        console.log(res.response);
        return res.response;
      }      
    }
  }
}

const apiCtrl = new ApiCtrl(CENTRAL_API_ROOT);

export default apiCtrl;
