const moment = require("moment");
const DATE_FORMAT = "YYYY/MM/DD HH:mm:ss";

function getCurrentDate() {
  return moment().local().format(DATE_FORMAT);
}

module.exports = getCurrentDate;
