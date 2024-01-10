<script setup lang="ts">
import { onUnmounted, onMounted, ref} from "vue";
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
let observe: ResizeObserver
const emit = defineEmits<{
  click: [string]
}>()

/**
 * 创建散点图数据
 * @return 包含该区域当日重确诊数据
 */
const createScatterDate = (): MapData[]  => {
  const list: MapData[] = []

  if (store.list) {
    const areaList = store.cityAreaData
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

/**
 * 初始化地图
 */
const initMapChart = async () => {
  if (!store.list) await store.getList()

  if (mapEl.value) {
    const mapChart = new MapChart(mapEl.value)
    mapChart.init()
    mapChart.setScatterFormat(setCount)
    mapChart.setScatterDate(createScatterDate())

    observe = new ResizeObserver(() => {
      mapChart.chart?.resize()
    })
    observe.observe(mapEl.value)

    // 注册地图点击事件
    mapChart.onClick(area => {
      emit('click', area)
    })
  }
}


onMounted(() => {
  initMapChart()
})

onUnmounted(() => {
  observe?.disconnect()
})

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