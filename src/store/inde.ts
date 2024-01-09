import {defineStore} from "pinia";
import {getList} from "../server";

export const useStore = defineStore('counter', {
  state(): { list?: CountData } {
    return {}
  },
  actions: {
    async getList() {
      this.$state.list = await getList().then(resp => resp.data)
    }
  }
})
