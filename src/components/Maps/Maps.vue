<script setup lang="ts">
import * as echarts from 'echarts'
import {onMounted, ref} from "vue";
import {useStore} from "../../store/inde.ts";
import { geoCoordMap } from "@/assets/geoMap.ts"
import "@/assets/map.js"

const store = useStore()

const mapEl = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!store.list) {
    await store.getList()
  }

  interface MapData {
    name: string,
    count: number
    value: number[]
  }

  var data = ref<MapData[]>([
    {
      name: "内蒙古",
      count: 1332,
      value:[110.3467, 41.4899, 122]
    },
  ])

  /**
   * 散点图现实的数据
   * 设置给series-line.label. formatter配置项
   * @param param - 单个散点的数据集
   */
  const setCount =  (param: { data: MapData }) => {
    return param.data.count
  }

  const mapCharts = echarts.init(mapEl.value)
  mapCharts.setOption( {
    geo: {    // 地理坐标系组件, 可以在地理坐标系上绘制其他图标
      map: "china",     // 使用 registerMap 注册的地图名称。
      aspectScale: 0.8,  // 地图宽长比
      layoutCenter: ["50%", "50%"],  // 地图现实位置
      layoutSize: "100%",  // 地图大小
      // 地图区域样式
      itemStyle: {
        areaColor: {
          type: "linear-gradient",   // 类型 线性渐变
          x: 0,
          y: 1,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#ff7d7d", // 100% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        // shadowColor: "rgba(168,214,255,0)",  // 阴影颜色
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        opacity: 0.3,
        // 高亮状态下的多边形和标签样式。

      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      // 特定区域样式配置
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            // label: {  // 标签样式
            //   show: false,
            //   color: "#009cc9",
            // },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [  // 可视化图标
      {
        type: "map",  // 地图图表
        selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,  // 地图长宽比
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",  // 地图大小
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        // 配置地图区域label
        label: {
          show: true,  // 是否显示
          color: "#afafaf",
          fontSize: 10,
        },
        itemStyle: {  // 地图区域样式
          // 普通模式样式
          areaColor: "rgba(120,179,224,0.49)",
          borderColor: "#1cccff",
          borderWidth: 1,
        },
        emphasis: {   // 强调模式样式
          areaColor: "rgba(246,111,111,0.78)",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data.value,  // 图标绘制数据来源
      },
      {
        name: 'selectedPoint'
        type: 'scatter',   // 散点图
        coordinateSystem: 'geo',
        symbol: 'pin',    // 散点形状为气泡
        symbolSize: [30, 30],
        symbolOffset: ['0%', '0%'],   //设置偏移量 ,使其居中
        label: {
          show: true,
          formatter: setCount,
        },
        itemStyle: {
          color: '#d93737', //标志颜色
        },
        data: data.value,
        showEffectOn: 'render',  // 现实出现特效
        rippleEffect: {  // 特效相关
          brushType: 'stroke'
        },
        zlevel: 1
      },
    ],
  })

  mapCharts.on('click', (data) => {
    const { name } = data
    mapCharts.setOption({
      series: {
        name: 'selectedPoint',
        data: {
          name,
          // count: store?.list?.areaTree
          value: geoCoordMap[name]
        }
      }
    })
  })

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