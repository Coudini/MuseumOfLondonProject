var moment = require('moment');
import data from './data.js';
moment().format();

const createChartConfig = (data, dataType) => {
  const config = {};
  const chartData = [];
  const labels = [];
  // Because electricity is measured in cumulative form we need the last output
  let lastValue = 0;

  // separate data
  data.forEach((row) => {
    const date = new Date(row.time.replace(' ', 'T'));
    const time =
      date.getHours() +
      ':' +
      ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
    let value = parseFloat(row['measure_value::double']);

    // Because there is multiple values for the same minute in timestream we remove the extra
    if (!labels.includes(time)) {
      // difference of outputs
      const energyConsumption = value - lastValue;
      lastValue = value;
      chartData.push(energyConsumption);
      labels.push(time);
    }
  });

  // remove the first values because there is no lastValue to compare them with
  config.chartData = chartData.slice(1);
  config.chartLabels = labels.slice(1);
  config.dataType = dataType;
  return config;
};

const createBarChartConfig = (data, labels, dataType) => {
  const config = {};
  const chartData = [];

  data.forEach((set) => {
    if (set.length > 0) {
      const firstValue = set[0]['measure_value::double'];
      const lastValue = set[set.length - 1]['measure_value::double'];
      chartData.push(Math.round(lastValue - firstValue));
    } else {
      chartData.push(0);
    }
  });

  config.chartData = chartData;
  config.chartLabels = labels;
  config.dataType = dataType;
  return config;
};

const createBaseloadChartConfig = (data, labels, dataType) => {
  const config = {};
  const chartData = [];
  data.forEach((set) => {
    if (!isFinite(set)) {
      chartData.push(0);
    } else {
      chartData.push(Math.round(set));
    }
  });
  config.chartData = chartData;
  config.chartLabels = labels;
  config.dataType = dataType;
  return config;
};

const createHeatMapConfig = async () => {
  const currentMonth = moment().month();
  const lastDay = moment()
    .month(currentMonth - 2)
    .startOf('month')
    .format('YYYY-MM-DD');
  const date = new Date();
  const heatMapChart = [];
  let currentDate = moment(date).format('YYYY-MM-DD');

  while (currentDate !== lastDay) {
    const tempDate = currentDate;
    date.setDate(date.getDate() - 1);
    currentDate = moment(date).format('YYYY-MM-DD');
    const query = `SELECT * FROM "metersdemo"."mqtt_consumer" WHERE name = \'EM996001_IncomingMains\' AND time BETWEEN \'${currentDate}\' AND \'${tempDate}\' ORDER BY time ASC`;
    await data(query, (array) => {
      if (array.length > 0) {
        const firstValue = array[0]['measure_value::double'];
        const lastValue = array[array.length - 1]['measure_value::double'];
        const energyConsumption = lastValue - firstValue;
        heatMapChart.push({ date: currentDate, count: energyConsumption });
      } else {
        heatMapChart.push({ date: currentDate, count: 0 });
      }
    });
  }

  return heatMapChart;
};

const createBudgetDailyConfig = (data) => {
  let config = {};
  let chartData = [];
  let dayLabels = [];

  data.forEach((week) => {
    let day = [];
    for (let i = 0; i < week.length; i++) {
      const date = new Date(week[i].time);
      const dd = String(date.getDate());
      if (!dayLabels.includes(dd)) {
        dayLabels.push(dd);
        if (i == 0) {
          day.push(week[i]['measure_value::double']);
        } else {
          const f = day[0];
          const l = day[day.length - 1];
          chartData.push(l - f);
          day = [];
        }
      } else {
        day.push(week[i]['measure_value::double']);
        if (i == week.length - 1) {
          const f = day[0];
          const l = day[day.length - 1];
          chartData.push(l - f);
        }
      }
    }
  });

  config.chartData = chartData;
  config.chartLabels = dayLabels;
  return config;
};

export {
  createChartConfig,
  createBarChartConfig,
  createBaseloadChartConfig,
  createBudgetDailyConfig,
  createHeatMapConfig,
};
