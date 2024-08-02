import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";
import { type } from "os";
// import { setItemToAsync } from "../utils/asyncStorage";

const Notice = types.model("Notice", {
    id: types.optional(types.number, 0),
    title: types.optional(types.string, ''),
    content: types.optional(types.string, ''),
    created_at: types.optional(types.string, ''),
    content_img: types.maybeNull(types.string),
  })
  const NoticeStore = observable(types.model("NoticeStore", {
    notices: types.map(Notice),
  }).actions(self => ({
    setNotices(notices) {
      self.notices.clear();
      notices.forEach(notice => {
        self.notices.set(notice.id, notice);
      });
    },
  // async inquiryNotice() {
  //     await apiCtrl.inquiryNotice().then(response => {
  //         try {
  //           let data = response.data;
  //           console.log(data.notice);
  //           self.setNotices(data.notice);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       })
  //   },
  async inquiryNotice() {
    await apiCtrl.inquiryNotice().then(response => {
      try {
        let data = response.data;
        console.log("response data:", data); 
        self.setNotices(data.notice);
      } catch (e) {
        console.log(e);
      }
    }).catch(e => {
      console.log(e);
    });
  },
  
  })).views(self => ({
    get noticeList() {
      return values(self.notices);
    }
  
  })));

export default NoticeStore;