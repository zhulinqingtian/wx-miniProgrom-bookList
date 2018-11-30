/**
 * ==============================
 * 折线图 数据
 */
const lineData =//[0.0001, 0.00032, 0.00046,0.0005, 0.00066,0.0007, 0.00012, -0.0046, -0.00065, -0.0032,]
  [
    {
      name: '线图1',
      data: [1, 32, 46.5, 66.7, 12, -46, -65, -32,],
      color: 'rgb(255,231,146)',
    },
    {
      name: '线图2',
      data: [-1, -32, -46.5, -66.7, -12, 46, 65, 32, -3, -55, -100, 3, -1, -32, -46.5, -66.7, -12, 46, 65, 32, -3, -55, -100, 3],
      color: 'rgb(182,213,93)',
    },
    {
      name: '线图3',
      data: [-1, -2, -4, -6, -12, -16, 5, 3, -3, 8, 20, 30, 5, 3, -3, 8, 20, 30],
      color: 'rgb(89,195,225)',
    }
  ];
const lineLabel = ['一月啊啊啊啊啊啊', '二月', '三月', '四月', '五月', '⑥月', '⑦月', '⑧月', '九月', '十月', '十一月啊啊啊啊啊！', '十二月', '一月', '二月', '三月', '四月', '五月', '⑥月', '⑦月', '⑧月', '九月', '十月', '十一月啊啊啊啊啊？', '十二月'];
const LineOptions = {
  data: lineData,
  xLabel: lineLabel,
  style: 'line',
  lineStyle: 'curve',
  area: false,
  showTooltip: true,
  tooltip: '{a}：{b}',
  showLabel: true,
};
/**
 * 折线图 数据
 * ==============================
 */

/**
 * 饼图数据
 */

var pieData = [
  { name: "篮球", value: 20, color: "rgb(250,239,66)" },
  { name: "足球", value: 10, color: "rgb(108,187,90)" },
  { name: "乒乓球", value: 30, color: "rgb(0,163,233)" },
  { name: "棒球", value: 60, color: "rgb(228,0,127)" },
  { name: "排球", value: 100, color: "rgb(106,49,142)" }
];

/**
 * 雷达图数据
 */
var radarData = [{ name: "库里", value: [95, 50, 60, 30, 88, 90], color: "rgb(0,175,236)" },
{ name: "詹姆斯", value: [90, 80, 70, 40, 75, 88], color: "rgb(206,0,30)" },
{ name: "霍华德", value: [60, 88, 75, 60, 40, 20], color: "rgb(84,27,134)" },]

var radarXLabel = ['投篮', '扣篮', '篮板', '盖帽', '传球', '突破']


Page({
  data: {
    roseRata: [
      { name: "甜甜圈", value: 50, color: "#80e0ed" },
      { name: "冰淇淋", value: 40, color: "#9197ed" },
      { name: "棒棒糖", value: 30, color: "#eddf5c" },
      { name: "奶茶", value: 60, color: "#e4ff99" },
      { name: "抹茶蛋糕", value: 50, color: "#baffad" },
      { name: "蛋挞", value: 20, color: "#afee9d" }
    ],
    ringData: [
      { name: "iOS", value: 4, color: "rgb(0,164,227)" },
      { name: "Android", value: 3, color: "rgb(246,172,26)" },
      { name: "微信小程序", value: 6, color: "rgb(25,173,94)" },
      { name: "H5", value: 12, color: "rgb(142,195,31)" }
    ],
    barData: [
      { name: "仙草布丁", data: [10, 60, 45, 67, 40, 33, 40], color: "rgb(0,175,236)" },
      { name: "波霸奶茶", data: [5, 34, 54, 66, 30, 23, 55], color: 'orange' },
      { name: "熊猫奶盖", data: [11, 23, 42, 43, 13, 2, 40], color: "rgb(206,0,30)" }
      /*{ name: "牛奶三兄弟", data: [21,44,5,65,66,78,88], color: "pink" },
      { name: "益菌多", data: [9,8,12,32,18], color: "blue" },
      { name: "紫米露", data: [10,2,34,54,21,33], color: "green" },
      { name: "芒果多多", data: [12,32,43,12], color: "red" },
      { name: "草莓多多", data: [31,23,44,55], color: "purple" },
      { name: "西柚多多", data: [54,32,66,55], color: "gray" },*/
    ],
    roseComp: '',
    ringComp: '',
    barComp: ''
  },
  onLoad: function (options) {
    // this.createdRose();
    // this.createdRing();
    this.createdBar();
    this.createdBubble();
    this.createdPie();

    // 雷达图
    var options = {
      data: radarData,
      xLabel: radarXLabel,
      chartRatio: 0.7,
      style: 'radar',
      showLabel: true,
      animation: true,
      showTooltip: true,
      tooltip: '{a}:{b}',
      area: false,
    }
    this.roseComp = this.selectComponent('#radar');
    this.roseComp.setOptions(options);
    this.roseComp.initChart(320, 250);
  },

  /**
   * rose图
   */

  createdRose() {
    var obj = {
      type: 'rose',
      id: '#rose',
      data: this.data.roseRata,
      width: 320,
      height: 213,
      chartRatio: 0.95
    };
    this.setData({ roseComp: this.selectComponent('#rose')});
    this.createdChart(this.data.roseComp, obj);
  },

  /**
   * 环形图
   */

  createdRing() {
    var obj = {
      type: 'ring',
      id: '#ring', 
      data: this.data.ringData, 
      width: 320, 
      height: 213, 
      chartRatio: 0 
    };
    this.setData({ ringComp: this.selectComponent('#ring') });
    this.createdChart(this.data.ringComp, obj);
  },

  /**
   * 柱状图
   */

  createdBar() {
    var xLabel = ['一季度', '二季度', '三季度', '四季度'];
    var options = {
      data: this.data.barData,
      xLabel: xLabel,
      style: 'bar',
      showTooltip: true,
      tooltip: '{a}：{b}',
      showLabel: true,
      rectStyle: 'accum',
    };

    this.setData({ barComp: this.selectComponent('#bar') });
    this.data.barComp.setOptions(options);
    this.data.barComp.initChart(320, 213);
  },

  /**
   * 散点图
   */

  createdBubble() {
    var xLabel = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月'];
    var bubbleData = [
      {
        name: '温度',
        yLabel: [2800, 3434, 4678, 2367, 1145, 908, 568, 1131, 3526], //海拔
        value: [19, 25, 24, 33, 40, 38, 29, 43, 40],
        color: 'rgb(206,0,30)',
      }, {
        name: '降雨量',
        yLabel: [2600, 3500, 4235, 3699, 1590, 3222, 489, 1246, 3020],
        value: [20, 30, 23, 33, 44, 50, 76, 33, 10],
        color: 'rgb(0,175,236)',
      }
    ];
    var options = {
      data: bubbleData,
      xLabel: xLabel,
      style: 'bubble',
      lineStyle: 'curve',
      showLabel: true,
      showTooltip: true,
      tooltip: '{a}：{b}',
    }
    this.bubbleComp = this.selectComponent('#bubble');
    this.bubbleComp.setOptions(options);
    this.bubbleComp.initChart(320, 213);
  },

  /**
   * 折线图
   */
  createdLine() {
    this.lineChart = this.selectComponent('#line');
    this.lineChart.setOptions(LineOptions);
    this.lineChart.initChart(320, 213);
  },

  onTypetap: function (e) {
    let val = parseInt(e.currentTarget.dataset.type);
    switch (val) {
      case 0: 
        LineOptions.data = [lineData[0]];
        LineOptions.showLabel = false;
        break;
      case 1: 
        LineOptions.data = lineData;
        LineOptions.showLabel = true;
        break;
      case 2: 
        LineOptions.area ? LineOptions.area = false : LineOptions.area = true;
        break;
      case 3: LineOptions.lineStyle = 'line'; break;
      case 4: LineOptions.lineStyle = 'curve'; break;
    }
    this.lineChart = this.selectComponent('#line');
    this.lineChart.setOptions(LineOptions);
    this.lineChart.initChart(320, 213);
  },


  /**
   * 饼图
   */

  createdPie() {
    var options = {
      data: pieData,
      legend: '{b}',
      chartRatio: 0,
      style: 'pie',
      showLegend: true,
      showLabel: true,
      animation: true,
      showTooltip: true,
      tooltip: '{a}:{c}',
    }
    this.pieComp = this.selectComponent('#pie-3');
    this.pieComp.setOptions(options);
    this.pieComp.initChart(200, 200);
  },

  /**
   * 雷达图
   */

  createdRadar() {
    var options = {
      data: [{ name: "iPhone", value: [18, 15.5, 12, 10.2, 17.9], color: "rgb(0,175,236)" }],
      xLabel: ['外观', '屏幕', '拍照', '系统', '性能'],
      chartRatio: 0.8,
      style: 'radar',
      showLabel: false,
      animation: true,
      showTooltip: true,
      area: true,
    }
    this.roseComp = this.selectComponent('#radar');
    this.roseComp.setOptions(options);
    this.roseComp.initChart(320, 320);
  },

  /**
   * 公共方法
   */
  createdChart(comp, { type, id, data, width, height, chartRatio = ''}) {
    var options = {
      data: data,
      legend: '{c}',
      chartRatio: chartRatio,
      style: type,
      showLegend: true,
      showLabel: true, // 每一项的标签
      animation: true,
      showTooltip: true,
      tooltip: '{a}：{b}人' // 鼠标在当前区域点击或拖动时显示的内容
    }

    comp.setOptions(options);
    comp.initChart(width, height);  // width height
  }
});