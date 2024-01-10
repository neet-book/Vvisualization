<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "@/store/inde.ts";
import { geoCoordMap } from "@/assets/geoMap.ts"
import { MapChart } from "./MapChart";

const store = useStore()
const mapEl = ref<HTMLElement | null>(null)

interface MapData {
  name: string,
  count: number
  value: number[]
}

// const data = ref<MapData[]>([
//   {
//     name: "内蒙古",
//     count: 1332,
//     value: [110.3467, 41.4899, 122]
//   },
// ])


onMounted(async () => {
  if (!store.list) {
    await store.getList()
  }

  /**
   * 散点图显示的数据, 返回数据中字段字段的值
   * 设置给series-line.label. formatter配置项
   * @param param - 单个散点的数据集
   */
  const setCount = (param: { data: MapData }) => {
    return param.data.count
  }

  if (mapEl.value) {
    const mapChart = new MapChart(mapEl.value)
    mapChart.init()
    mapChart.setScatterFormat(setCount)

    mapChart.onClick(area => {
      const value = geoCoordMap[area]
      mapChart.setScatterDate<MapData>([
        {
          name: area,
          value,
          count: 100
        }
      ])
    })
  }

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