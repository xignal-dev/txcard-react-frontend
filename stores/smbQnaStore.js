import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";
import { type } from "os";
// import { setItemToAsync } from "../utils/asyncStorage";

const Qna = types.model("Qna", {
    id: types.optional(types.number, 0),
    title: types.optional(types.string, ''),
    content: types.optional(types.string, ''),
    content_file: types.optional(types.string, ''),
    status: types.optional(types.string, ''),
    created_at: types.optional(types.string, ''),
    answer_content: types.optional(types.string, ''),
    answer_created_at: types.optional(types.string, ''),
  })
  const QnaStore = observable(types.model("QnaStore", {
    qnas: types.map(Qna),
  }).actions(self => ({
    setQnas(qnas) {
      self.qnas.clear();
      qnas.forEach(qna => {
        self.qnas.set(qna.id, qna);
      });
    },

  async getQnaList() {
      await apiCtrl.getQnaList().then(response => {
          try {
            let data = response.data;
            console.log(data.qna);
            self.setQnas(data.qna);
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => {
          console.log(e);
        })
  },

  async postQna(value) {
    await apiCtrl.postQna (value).then(response => {
      try {
        console.log(response.data);
        self.setQnas(data.qna);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(e => {
      console.log(e);
    });    
  },
  
  })).views(self => ({
    get qnaList() {
      return values(self.qnas);
    }
  
  })));

export default QnaStore;