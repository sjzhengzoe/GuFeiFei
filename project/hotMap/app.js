// import googleapi from 'googleapis';
const { google } = require("googleapis");
const key = require("./keys.json");

const viewId = "ga:179673915";
const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ["https://www.googleapis.com/auth/analytics", "https://www.googleapis.com/auth/analytics.readonly"], null);

async function queryData(options) {
  return new Promise((resolve, reject) => {
    google.analytics("v3").data.ga.get(options, async (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function configOptions(metrics, dimensions, startDate, endDate = "today", empty = false, filters, sort) {
  let options = {
    auth: jwtClient,
    ids: viewId,
    metrics: metrics,
    dimensions: dimensions,
    "start-date": startDate,
    "end-date": endDate,
    "max-results": 150,
    "include-empty-rows": empty,
  };
  if (filters) {
    options.filters = filters;
  }
  if (sort) {
    options.sort = sort;
  }
  return options;
}

function dateFormat(date, fmt = "YYYY-MM-DD HH:mm:ss", days) {
  if (!date) {
    return "";
  }
  if (typeof date === "string") {
    date = new Date(date.replace(/-/g, "/"));
  }
  if (typeof date === "number") {
    date = new Date(date);
  }
  if (days && typeof days === "number") {
    date.setDate(date.getDate() + days);
  }
  var o = {
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  var week = {
    0: "\u65e5",
    1: "\u4e00",
    2: "\u4e8c",
    3: "\u4e09",
    4: "\u56db",
    5: "\u4e94",
    6: "\u516d",
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
}

function userChart(req, res, next) {
  //  维度
  const dimensions = "ga:dimension1";
  //  指标次数
  const metrics = "ga:metric1";
  const startDate = dateFormat(new Date("2020-12-01"), "YYYY-MM-DD", -30);
  const endDate = dateFormat(new Date("2020-12-07"), "YYYY-MM-DD");
  let options = configOptions(metrics, dimensions, startDate, endDate, false, "ga:deviceCategory==mobile", "-ga:metric1,ga:dimension1");
  queryData(options).then(
    (response) => {
      let responseData = {};
      let headers = response.data.columnHeaders;

      headers.splice(0, 1);
      let rows = response.data.rows;

      responseData = rows.map((item, index) => {
        return { selector: item[0].replace(/^【[\s\S]*】/, ""), val: item[1] };
      });

      console.log("response.data:", responseData);
    },
    (err) => {
      console.log("---err");
      returnError(res, err);
    }
  );
}

userChart();
