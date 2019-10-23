// components/calendar/calendar.js

var calendarUtil = require('../../utils/calendarUtil');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentYear: {
      type: String,
      value: new Date().getFullYear()
    },
    currentMonth: {
      type: Number,
      value: new Date().getMonth() + 1
    },
    currentDay: {
      type: Number,
      value: new Date().getDate()
    },
    currentDateStr: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentMonthDateLen: 0, // 当月天数
    preMonthDateLen: 0, // 当月中，上月多余天数
    allDate:[],
    startX: 0, // 开始移动的位置
    currentMonthTodoList: [] // 当月行程列表
  },
  ready(){},
  created() {
    this.getDatesAndActivitys();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取当月日期和活动
    getDatesAndActivitys() {
      const y = this.data.currentYear;
      const m = this.data.currentMonth;
      this.getTodoListByYearAndMonth(y, m, () => { // 获取当前月活动
        this.setData({
          allDate: []
        }, () => {
          this.getAllDate(y, m);
        });
      });
    },
    // 整合当月所有数据
    getAllDate(y, m){ // data: 当月活动列表
      let {preMonthDateArr, preMonthDateLen} = calendarUtil.getPreMonthDateInCurrent(y, m);
      let {currentMonthDateArr, currentMonthDateLen} = calendarUtil.getCurrentArr(y, m);
      this.setData({
        preMonthDateLen, currentMonthDateLen
      }, () => {
        let nextArr = calendarUtil.getNextMonthDateInCurrent(y, m, preMonthDateLen, currentMonthDateLen);
        let allDate = [...preMonthDateArr, ...currentMonthDateArr, ...nextArr];

        if (allDate && allDate.length) {
          this.matchDateAndActivity(allDate);
        }
      });
    },
    // 获取上月数据
    getPreMonthShow(){
      let { year, month } = calendarUtil.preMonth(this.data.currentYear, this.data.currentMonth);
      this.setData({
        currentYear: year,
        currentMonth: month,
        currentMonthTodoList: []
      }, () => {
        this.getDatesAndActivitys();
      });
    },

    // 获取下月数据
    gotoNextMonthShow() {
      let { year, month } = calendarUtil.nextMonth(this.data.currentYear, this.data.currentMonth);
      this.setData({
        currentYear: year,
        currentMonth: month,
        currentMonthTodoList: []
      }, () => {
        this.getDatesAndActivitys();
      });
    },

    // 获取某个月所有日期对应的活动
    getTodoListByYearAndMonth(y, m, callback) {
      var data =  [
        {
          id: 1,
          title: 'XXX活动',
          exeTime: '2019-10-04',
          isDone: 1
        },
        {
          id: 2,
          title: '***活动',
          exeTime: '2019-11-24',
          isDone: 0
        },
        {
          id: 3,
          title: '吃饭',
          exeTime: '2019-10-12',
          isDone: 1
        },
        {
          id: 4,
          title: '睡觉',
          exeTime: '2019-10-01',
          isDone: 0
        }
      ];
      this.setData({
        currentMonthTodoList: data
      });
      callback && callback(data);
    },

    matchDateAndActivity(dates = []) {
      var activitys = this.data.currentMonthTodoList;
      var mixData = dates;
      if (activitys && activitys.length) {
        dates.forEach((date, index) => { // date:{month: "current", date: 1}
          activitys.forEach(ac => { // {id: 2, title: "***活动", exeTime: "2019-08-24", isDone: false}
            const day = new Date(ac.exeTime).getDate();
            if (+date.date === +day) {
              if (date.month === 'current' && date.dateStream === +new Date(ac.exeTime + ' 00:00:00')) {
                mixData[index].activitys.push(ac);
              }
            }
          });
        });
      }
      this.setData({
        allDate: mixData
      });
    },

    touchS(e) {
      if (e.touches.length == 1) {
        this.setData({
          //设置触摸起始点水平方向位置
          startX: e.touches[0].clientX
        });
      }
    },
    touchE(e) {
      if (e.changedTouches.length === 1) {
        var endX = e.changedTouches[0].clientX;
        var disX = this.data.startX - endX;
        if (disX > 30) {
          this.gotoNextMonthShow();
        } else if (disX < -30) {
          this.getPreMonthShow();
        }
      }
    }

    // allDate格式:
    // [
    //   {month: "pre", date: 31},
    //   {month: "current", date: 1}
    // ]
  },
  computed: {

  }
});