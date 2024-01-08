import {defineStore} from "pinia";
import {getList} from "../server";

export const useStore = defineStore('counter', {
  state() {
   return {}
},
  actions: {
    async getList() {
      this.$state = await getList()
    }
  }
})
