/**
 * 日期格式化 时间戳 -> YYYY-MM-DD hh:mm:ss
 */
function dateFormat (date, format = 'YYYY-MM-DD hh:mm:ss') {
  if (+date === 0 || Number.isNaN(+date)) {
    // console.error(`invalid date: ${date}`)
    return '--'
  }

  const d = new Date(+date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const min = d.getMinutes()
  const sec = d.getSeconds()

  function pad (num) {
    return String(num).replace(/\b(\d)\b/g, '0$1')
  }

  return format.replace('YYYY', year)
    .replace(/MM/, pad(month))
    .replace(/\b(M)\b/, month)

    .replace(/DD/, pad(day))
    .replace(/\b(D)\b/, day)

    .replace(/hh/, pad(hour))
    .replace(/\b(h)\b/, hour)

    .replace(/mm/, pad(min))
    .replace(/\b(m)\b/, min)

    .replace(/ss/, pad(sec))
    .replace(/\b(s)\b/, sec)
}

/**
 * 获取某年某月总共多少天
 */
function getDaysByYearAndMonth(year, month){
  let actualMonth = month - 1;
  let totalDays = +new Date(year, month) - +new Date(year, actualMonth);
  return totalDays / (1000 * 60 * 60 * 24);
}

/**
 * 获取某月1号是周几
 */
function getFirstDateWeek(year, month) {
  return new Date(year, month - 1, 1).getDay()
}

/**
 * 获取上个月的 年、月
 */
function preMonth(year, month) {
  if (+month === 1) {
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
}

/**
 * 获取下个月的 年、月
 */
function nextMonth(year, month) {
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
}

/**
 * 获取当月的日期,返回数组
 */
function getCurrentArr(currentYear, currentMonth){
  let currentMonthDateLen = getDaysByYearAndMonth(currentYear, currentMonth); // 获取当月天数
  let currentMonthDateArr = []; // 定义空数组
  if (currentMonthDateLen > 0) {
    for (let i = 1; i <= currentMonthDateLen; i++) {
      var dateStr = currentYear + '-' + (currentMonth < 10 ? '0' + currentMonth : currentMonth) + '-' + (i < 10 ? '0' + i : i) + ' 00:00:00';
      currentMonthDateArr.push({
        month: 'current', // current：当前月  pre:上月  next:下月
        date: i,
        dateStream: +new Date(dateStr),
        dateStr,
        activitys: []
      })
    }
  }
  return {currentMonthDateArr, currentMonthDateLen}
}

/**
 * 获取当月中，上月多余数据，返回数组
 */
function getPreMonthDateInCurrent(year, month){
  let preMonthDateLen = getFirstDateWeek(year, month); // 当月1号是周几 == 上月残余天数）
  let preMonthDateArr = []; // 定义空数组
  if (preMonthDateLen > 0) {
    let { year1 = year, month1 = month } = preMonth(year, month); // 获取上月 年、月
    let date = getDaysByYearAndMonth(year1, month1); // 获取上月天数
    for (let i = 0; i < preMonthDateLen; i++) {
      var dateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date) + ' 00:00:00';
      preMonthDateArr.unshift({ // 尾部追加
        month: 'pre',
        date: date,
        dateStream: +new Date(dateStr),
        dateStr,
        activitys: []
      });
      date--
    }
  }
  return {preMonthDateArr, preMonthDateLen}
}

/**
 * 获取当月中，下月多余数据，返回数组
 */
function getNextMonthDateInCurrent(year, month, preMonthDateLen, currentMonthDateLen) {
  let nextMonthDateLen = 35 - preMonthDateLen - currentMonthDateLen; // 下月多余天数
  let nextMonthDateArr = []; // 定义空数组
  if (nextMonthDateLen > 0) {
    for (let i = 1; i <= nextMonthDateLen; i++) {
      var dateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (i < 10 ? '0' + i : i) + ' 00:00:00';
      nextMonthDateArr.push({
        month: 'next',
        date: i,
        dateStream: +new Date(dateStr),
        dateStr,
        activitys: []
      })
    }
  }
  return nextMonthDateArr;
}

module.exports = {
  getDaysByYearAndMonth,
  getFirstDateWeek,
  preMonth,
  nextMonth,
  getCurrentArr,
  getPreMonthDateInCurrent,
  getNextMonthDateInCurrent,
  dateFormat
};