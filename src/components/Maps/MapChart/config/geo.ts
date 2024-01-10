/**
 * 地理坐标系组件配置, 可以在地理坐标系上绘制其他图标
 * 文档: {@link https://echarts.apache.org/zh/option.html#geo}
 */

export default {
  // 使用 registerMap 注册的地图名称。
  map: "china",
  // 地图宽长比
  aspectScale: 0.8,
  // 地图显示位置
  layoutCenter: ["50%", "50%"],
  // 地图大小
  layoutSize: "100%",
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

  },
  // 强调状态下的多边形和标签样式。
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
  ]
}