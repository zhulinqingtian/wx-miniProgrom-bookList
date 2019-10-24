/**
 * 时间戳 -> 年-月-日
 * 
 * eg: formatStandardDate(new Date('2018-2-3'))     ->  "2018-02-03"
 *     formatStandardDate(new Date(1514736000000))  ->  "2018-01-01"
 */
exports.formatStandardDate = function (date) {
  if (date instanceof Date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (y && m && d) {
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
    }
  }
  return '';
};

/**
 * 时间戳 -> 年-月-日 时:分
 * 
 * eg: formatStandardDateMin(new Date('2018-2-3'))  ->  "2018-02-03 00:00"
 */
exports.formatStandardDateMin = function (date) {
  if (date instanceof Date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var hh = date.getHours();
    var min = date.getMinutes();
    if (y && m && d) {
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (hh < 10 ? '0' + hh : hh) + ':' + (min < 10 ? '0' + min : min);
    }
  }
  return '';
};

/**
 * 时间戳 -> 年-月-日 时:分:秒
 * 
 * eg: formatStandardDateSecond(new Date('2018-2-3'))  ->  "2018-02-03 00:00:00"
 */
exports.formatStandardDateSecond = function (date) {
  if (date instanceof Date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var hh = date.getHours();
    var min = date.getMinutes();
    var s = date.getSeconds();
    if (y && m && d) {
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (hh < 10 ? '0' + hh : hh) + ':' + (min < 10 ? '0' + min : min) + ':' + (s < 10 ? '0' + s : s);
    }
  }
  return '';
};

/**
 * 字符串 -> 标准时间
 * 
 * eg: newDate('2018-2-3')  ->  Sat Feb 03 2018 00:00:00 GMT+0800 (中国标准时间)
 */
exports.newDate = function (str) {
  str = str.split('-');
  var date = new Date();
  date.setFullYear(str[0], str[1] - 1, str[2]);
  date.setHours(0, 0, 0, 0);
  return date;
};


/**
 * 从今天起增加若干天 -> 年-月-日
 * 
 * eg: addDay(5) -> "2018-12-19"
 */
exports.addDay = function (num) {
  var date = new Date();
  var resultDate = new Date(+date + num * 86400000);
  if (resultDate instanceof Date) {
    var y = resultDate.getFullYear();
    var m = resultDate.getMonth() + 1;
    var d = resultDate.getDate();
    if (y && m && d) {
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
    }
  }
  return '';
};