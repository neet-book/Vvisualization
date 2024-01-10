import "@/assets/map.js"
import options from './config'
import * as echart from 'echarts'
import "@/assets/map.js"
import type {EChartsType} from "echarts";

interface ScatterData {
  value: number []
}

export class MapChart {
  el: HTMLElement
  chart: EChartsType | null = null

  constructor(el: HTMLElement) {
    this.el = el
  }

  /**
   * 初始化map
   */
  init() {
    this.chart = echart.init(this.el)
    this.chart.setOption(options)
  }

  /**
   * 设置散点图显示的是Date中的哪个字段
   * @param formatter - 函数, 负责从传入的data中将要显示的数据返回
   */
  setScatterFormat<T>(formatter: (param: { data: T }) => any) {
    this.chart?.setOption({
      series: [
        {
          name: 'selectedPoint',
          label: {
            formatter
          }
        }
      ]
    })
  }

  /**
   * 监听地图点击事件, 当地图某区域被点击时调用
   * @param callback - 回调函数, 接受地区名字作为参数
   */
  onClick(callback: (area: string) => void) {
    this.chart?.on('click', ({name}) => {
      callback(name)
    })
  }

  /**
   * 设置散点图位置和其他要显示的数据
   * @param data 位置和显示的数据
   */
  setScatterDate<T extends ScatterData>(data: T[]) {
    this.chart?.setOption({
      series: [{
        name: 'selectedPoint',
        data: data
      }]
    })
  }
}