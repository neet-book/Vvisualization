import {defineStore} from "pinia";
import {getList} from "../server";

export const useStore = defineStore('counter', {
  state: () => {
    return {
      list: <CountData>{},
      area: ''
    }
  },
  getters: {
    areaCityData: (state) => {
      return state.list.chinaAreaData.children
    }
  },
  actions: {
    async getList() {
      this.$state.list = await getList().then(resp => resp.data)
    },
    setCurrentArea(area: string) {
      this.$state.area = area
    }
  }
})
