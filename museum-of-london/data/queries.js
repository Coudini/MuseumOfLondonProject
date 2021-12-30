var moment = require('moment');

moment().format();

const getDataQueries = (names) => {
  const queries = [];
  names.forEach((name) => {
    const query = `SELECT * FROM "metersdemo"."mqtt_consumer" WHERE name = \'${name}\' AND time between ago(24h) and now() ORDER BY time ASC`;
    queries.push(query);
  });
  return queries;
};

const getWeekDataQueries = (amountOfWeeks) => {
  const queries = [];
  const currentWeekNumber = moment().isoWeek();
  for (let i = 0; i < amountOfWeeks; i++) {
    const firstDay = moment()
      .isoWeek(currentWeekNumber - i)
      .startOf('isoweek')['_d'];
    const lastDay = moment()
      .isoWeek(currentWeekNumber - i)
      .endOf('isoweek')['_d'];
    const formattedFirstDay =
      firstDay.getFullYear() +
      '-' +
      (firstDay.getMonth() + 1) +
      '-' +
      firstDay.getDate();
    const formattedLastDay =
      lastDay.getFullYear() +
      '-' +
      (lastDay.getMonth() + 1) +
      '-' +
      lastDay.getDate() +
      ' 23:59:59';
    const query = `SELECT * FROM "metersdemo"."mqtt_consumer" WHERE name = \'EM996001_IncomingMains\' AND time BETWEEN \'${formattedFirstDay}\' AND \'${formattedLastDay}\' ORDER BY time ASC`;
    queries.push(query);
  }
  return queries;
};

const getDayQueries = (amountOfDays) => {
  const queries = [];
  var date = new Date();

  for (let i = 1; i <= amountOfDays; i++) {
    const lastDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    date.setDate(date.getDate() - 1);
    const formattedDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const query = `SELECT * FROM "metersdemo"."mqtt_consumer" WHERE name = \'EM996001_IncomingMains\' AND time BETWEEN \'${formattedDate}\' AND \'${lastDate}\' ORDER BY time ASC`;
    queries.push(query);
  }

  return queries;
};

export { getDataQueries, getWeekDataQueries, getDayQueries };
