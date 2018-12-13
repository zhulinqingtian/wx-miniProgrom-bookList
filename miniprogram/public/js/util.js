function formatStandardDate(date) {
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

exports.formatStandardDate = formatStandardDate;