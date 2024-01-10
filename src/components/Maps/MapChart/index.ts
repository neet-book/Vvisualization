import "@/assets/map.js"
import options from './config'
import * as echart from 'echarts'


export function MapChart(el: HTMLElement) {
  const chart = echart.init(el)
  chart.setOption(options)
  return chart
}