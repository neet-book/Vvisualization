<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import {useStore} from "@/store/inde.ts";
import {geoCoordMap} from "@/assets/geoMap.ts"
import {MapChart} from "./MapChart";
interface MapData {
  name: string,
  count: number | null
  value: number[]
}
const store = useStore()
const mapEl = ref<HTMLElement | null>(null)

const createScatterDate = (): MapData[]  => {
  const list: MapData[] = []

  if (store.list) {
    const areaList = store.list.chinaAreaData.children
    for (const area of areaList) {
      list.push({
        name: area.name,
        count: area.today.confirm,
        value: geoCoordMap[area.name]
      })
    }
  }

 return list
}

/**
 * 散点图显示的数据, 返回数据中字段字段的值
 * 设置给series-line.label. formatter配置项
 * @param param - 单个散点的数据集
 */
const setCount = (param: { data: MapData }) => {
  return param.data.count
}

const initMapChart = async () => {
  if (!store.list) await store.getList()

  if (mapEl.value) {
    const mapChart = new MapChart(mapEl.value)
    mapChart.init()
    mapChart.setScatterFormat(setCount)
    mapChart.setScatterDate(createScatterDate())
    console.log(createScatterDate())
    // 注册地图点击事件
    mapChart.onClick(area => {

    })
  }
}


onBeforeMount(() => {
  if (!store.list) store.getList()
})

onMounted(initMapChart)

</script>

<template>
  <div class="map-container" ref="mapEl"></div>
</template>

<style scoped lang="scss">
.map-container {
  height: 100%;
  backdrop-filter: blur(10px);
}

</style>