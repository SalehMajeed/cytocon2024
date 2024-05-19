const { DateTime } = require("luxon");
const moment = require("moment-timezone");

function generateDate(req) {
  const userLocale = req.headers["accept-language"];
  const userTimeZone = moment.tz.guess(userLocale);
  const dt = DateTime.now().setZone(userTimeZone);
  const formattedDate = dt.toFormat("EEE LLL dd HH:mm:ss 'IST' yyyy");
  return formattedDate;
}

module.exports = { generateDate };
