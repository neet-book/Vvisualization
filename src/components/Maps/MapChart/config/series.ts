
/**
 * 地图图表配置
 * 配置文档 {@link https://echarts.apache.org/zh/option.html#series-map}
 */
const chinaMap = {
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
 * 散点图配置
 * 配置文档: {@link https://echarts.apache.org/zh/option.html#series-scatter}
 */
const scatter = {
  name: 'selectedPoint',
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
  showEffectOn: 'render',  // 现实出现特效
  rippleEffect: {  // 特效相关
    brushType: 'stroke'
  },
  zlevel: 1
}

export default [
    map,
    scatter
]