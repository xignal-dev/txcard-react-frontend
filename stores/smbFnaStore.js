import { types } from "mobx-state-tree";
import { observable, action, values } from "mobx";
// import i18n from '../i18n/i18n';
import apiCtrl from "../utils/api";
import { type } from "os";
// import { setItemToAsync } from "../utils/asyncStorage";

const Fna = types.model("Fna", {
    id: types.optional(types.number, 0),
    title: types.optional(types.string, ''),
    content: types.optional(types.string, ''),
    created_at: types.optional(types.string, ''),
  })
  const FnaStore = observable(types.model("FnaStore", {
    fnas: types.map(Fna),
  }).actions(self => ({
    setFnas(fnas) {
      self.fnas.clear();
      fnas.forEach(fna => {
        self.fnas.set(fna.id, fna);
      });
    },
  async getFnaMainGuide() {
      await apiCtrl.getFnaMainGuide().then(response => {
          try {
            let data = response.data;
            console.log(data.fna);
            self.setFnas(data.fna);
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => {
          console.log(e);
        })
    },

    async getFrequentlyQuestions() {
      await apiCtrl.getFrequentlyQuestions().then(response => {
          try {
            let data = response.data;
            console.log(data.fna);
            self.setFnas(data.fna);
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => {
          console.log(e);
        })
    },
  
  })).views(self => ({
    get fnaList() {
      return values(self.fnas);
    }
  
  })));

export default FnaStore;