import {defineStore} from "pinia";
import {getList} from "../server";

export const useStore = defineStore('counter', {
  state: () => {
    return {
      list: <CountData>{}
    }
  },
  getters: {
    cityAreaData: (state) => {
      return state.list.chinaAreaData.children
    }
  },
  actions: {
    async getList() {
      this.$state.list = await getList().then(resp => resp.data)
    }
  }
})
