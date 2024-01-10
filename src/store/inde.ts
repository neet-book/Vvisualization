import {defineStore} from "pinia";
import {getList} from "../server";

export const useStore = defineStore('counter', {
  state: () => {
    return {
      list: <CountData>{}
    }
  },
  actions: {
    async getList() {
      this.$state.list = await getList().then(resp => resp.data)
    }
  }
})
