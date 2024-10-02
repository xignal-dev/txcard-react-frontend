import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";

const CardReq = types.model("CardReq", {
  coNo: types.optional(types.number, 0),
  coId: types.optional(types.string, ''),
  crId: types.optional(types.string, ''),
  coName: types.optional(types.string, ''),
  coEmail: types.optional(types.string, ''),
  coLevel: types.optional(types.number, 0),
  coTel: types.optional(types.string, ''),
  coLoginip: types.optional(types.string, ''),
  coLogdate: types.maybeNull(types.string, ''),
  coRegdate: types.maybeNull(types.string, ''),
  coOutdate: types.maybeNull(types.string, ''),
  coMemo: types.optional(types.string, ''),
});

const CardStore = observable(types.model("CardStore", {
    // offices: types.map(Office),
  }).actions(self => ({
    
    // setOffices(officeList) {
    //   self.offices.clear();
    //   officeList.forEach(office => {
    //     self.offices.set(office.coNo, office);
    //   });
    // },
    
    async cardRequest(data) {
      await apiCtrl.cardRequest(data).then(async response => {
        try {
          // console.log(response.data);
          if(response.data.accessToken) {
            await apiCtrl.cardRequest(data);
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

export default OfficeStore;