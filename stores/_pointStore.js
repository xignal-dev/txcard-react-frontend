import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";

const PointExchange = types.model("PointExchange", {
  ceNo: types.optional(types.number, 0),
  cmId: types.optional(types.string, ''),
  cmName: types.optional(types.string, ''),
  cmEmail: types.optional(types.string, ''),
  cmOffice: types.optional(types.string, ''),
  cePoint: types.optional(types.string,'0'),
  ceVnd: types.optional(types.string, '0'),
  ceRegdate: types.maybeNull(types.string, ''),
  ceChkdate: types.maybeNull(types.string, ''),
});

const PointGift = types.model("PointGift", {
  ceNo: types.optional(types.number, 0),
  cmId: types.optional(types.string, ''),
  cmName: types.optional(types.string, ''),
  cmEmail: types.optional(types.string, ''),
  cmOffice: types.optional(types.string, ''),
  cmRecvId: types.optional(types.string, ''),
  cmRecvEmail: types.optional(types.string, ''),
  cmRecvName: types.optional(types.string, ''),
  cePoint: types.optional(types.string,'0'),
  ceVnd: types.optional(types.string, '0'),
  ceRegdate: types.maybeNull(types.string, ''),
  ceChkdate: types.maybeNull(types.string, ''),
});


const PointStore = observable(types.model("CardStore", {
    // offices: types.map(Office),
  }).actions(self => ({
    
    // setOffices(officeList) {
    //   self.offices.clear();
    //   officeList.forEach(office => {
    //     self.offices.set(office.coNo, office);
    //   });
    // },
    
    async pointExchange(data) {
      await apiCtrl.pointExchange(data).then(async response => {
        try {
          if(response.data.accessToken) {
            await apiCtrl.pointExchange(data);
          }
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    
    async pointGift(data) {
      await apiCtrl.pointGift(data).then(async response => {
        try {
          if(response.data.accessToken) {
            await apiCtrl.pointExchange(data);
          }
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

export default PointStore;