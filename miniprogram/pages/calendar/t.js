// components/calendar/calendar.js

var calendarUtil = require('../../public/js/calendarUtil.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentYear: { // 当前显示的年
      type: Number,
      value: new Date().getFullYear()
    },
    currentMonth: { // 当前显示的月
      type: Number,
      value: new Date().getMonth() + 1
    },
    nowYear: { // 当前显示的月
      type: Number,
      value: new Date().getFullYear()
    },
    nowMonth: { // 当前显示的月
      type: Number,
      value: new Date().getMonth() + 1
    },
    nowDate: { // 当前显示的月
      type: Number,
      value: new Date().getDate()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentMonthDateLen: 0, // 当月天数
    preMonthDateLen: 0, // 当月中，上月多余天数
    allArr:[],
    nowData: '', // 当时年月日
    startX: 0 // 开始移动的位置
  },
  ready(){
    this.getAllArr();
  },
  onLoad: function () {
    var time = calendarUtil.dateFormat(new Date());
    this.setData({
      nowData: time
    });
    console.log("this.data.nowData:", this.data.nowData)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取某年某月总共多少天
    getDateLen(year, month) {
      let actualMonth = month - 1;
      let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
      return timeDistance / (1000 * 60 * 60 * 24);
    },
    // 获取某月1号是周几
    getFirstDateWeek(year, month) {
      return new Date(year, month - 1, 1).getDay()
    },
    // 上月 年、月
    preMonth(year, month) {
      if (month == 1) {
        return {
          year: --year,
          month: 12
        }
      } else {
        return {
          year: year,
          month: --month
        }
      }
    },
    // 下月 年、月
    nextMonth(year, month) {
      if (month == 12) {
        return {
          year: ++year,
          month: 1
        }
      } else {
        return {
          year: year,
          month: ++month
        }
      }
    },
    // 获取当月数据，返回数组
    getCurrentArr(){
      let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth) // 获取当月天数
      let currentMonthDateArr = [] // 定义空数组
      if (currentMonthDateLen > 0) {
        for (let i = 1; i <= currentMonthDateLen; i++) {
          currentMonthDateArr.push({
            month: 'current', // 只是为了增加标识，区分上下月
            date: i
          })
        }
      }
      this.setData({
        currentMonthDateLen
      })
      return currentMonthDateArr
    },
    // 获取当月中，上月多余数据，返回数组
    getPreArr(){
      let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth) // 当月1号是周几 == 上月残余天数）
      let preMonthDateArr = [] // 定义空数组
      if (preMonthDateLen > 0) {
        let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth) // 获取上月 年、月
        let date = this.getDateLen(year, month) // 获取上月天数
        for (let i = 0; i < preMonthDateLen; i++) {
          preMonthDateArr.unshift({ // 尾部追加
            month: 'pre', // 只是为了增加标识，区分当、下月
            date: date
          })
          date--
        }
      }
      this.setData({
        preMonthDateLen
      })
      return preMonthDateArr
    },
    // 获取当月中，下月多余数据，返回数组
    getNextArr() {
      let nextMonthDateLen = 35 - this.data.preMonthDateLen - this.data.currentMonthDateLen // 下月多余天数
      let nextMonthDateArr = [] // 定义空数组
      if (nextMonthDateLen > 0) {
        for (let i = 1; i <= nextMonthDateLen; i++) {
          nextMonthDateArr.push({
            month: 'next',// 只是为了增加标识，区分当、上月
            date: i
          })
        }
      }
      return nextMonthDateArr
    },
    // 整合当月所有数据
    getAllArr(){
      let preArr = this.getPreArr()
      let currentArr = this.getCurrentArr()
      let nextArr = this.getNextArr()
      let allArr = [...preArr, ...currentArr, ...nextArr]
      this.setData({
        allArr
      })
      let sendObj = {
        currentYear: this.data.currentYear,
        currentMonth: this.data.currentMonth,
        nowYear: this.data.nowYear,
        nowMonth: this.data.nowMonth,
        nowDate: this.data.nowDate,
        allArr: allArr
      }
      // console.log(sendObj)
      this.triggerEvent('sendObj', sendObj)
    },
    // 点击 上月
    gotoPreMonth(){
      let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth)
      this.setData({
        currentYear: year,
        currentMonth: month
      })
      this.getAllArr()
    },
    // 点击 下月
    gotoNextMonth() {
      let { year, month } = this.nextMonth(this.data.currentYear, this.data.currentMonth)
      this.setData({
        currentYear: year,
        currentMonth: month
      })
      this.getAllArr()
    },
    getNowData(e) {
      var data = e.currentTarget.dataset.day;
      var currenct = e.currentTarget.dataset.currenct;
      if (currenct==1){
        this.setData({
          nowYear: this.data.currentYear,
          nowMonth: this.data.currentMonth,
          nowDate: data
        })
      }
      this.getAllArr();
    },

    touchS(e) {
      if (e.touches.length == 1) {
        this.setData({
          //设置触摸起始点水平方向位置
          startX: e.touches[0].clientX
        });
      }
    },
    touchM(e) {
      if (e.touches.length == 1) {
        var moveX = e.touches[0].clientX;
        var disX = this.data.startX - moveX;
      }
    },
    touchE(e) {
      if (e.changedTouches.length == 1) {
        var endX = e.changedTouches[0].clientX;
        var disX = this.data.startX - endX;
        console.log('disX:', disX);
        if (disX > 30) {
          this.gotoNextMonth();
        } else if (disX < -30) {
          this.gotoPreMonth();
        }
      }
    }
  },
  computed: {

  }

})