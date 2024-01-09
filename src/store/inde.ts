import {defineStore} from "pinia";
import {getList, type CountData} from "../server";

export const useStore = defineStore('counter', {
  state(): { data?: CountData } {
    return {}
  },
  actions: {
    async getList() {
      this.$state.data = await getList().then(resp => resp.data)
    }
  }
})
