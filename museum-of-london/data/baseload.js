const getBaseloadByDay = (data) => {
  const closedHour = 0;
  const openHour = 5;
  let labels = [];
  let lastValue = 0;
  let baseloadEnergy = [];
  data.forEach((row) => {
    const date = new Date(row.time.replace(' ', 'T'));
    if (date.getHours() >= closedHour && date.getHours() <= openHour) {
      const time =
        date.getHours() +
        ':' +
        (date.getMinutes() == 0 ? '00' : date.getMinutes());
      let value = parseFloat(row['measure_value::double']);

      if (!labels.includes(time)) {
        const energyConsumption = value - lastValue;
        lastValue = value;
        baseloadEnergy.push(energyConsumption);
        labels.push(time);
      }
    }
  });
  labels = labels.slice(1);
  baseloadEnergy = baseloadEnergy.slice(1);
  const returnable = Math.min.apply(Math, baseloadEnergy);
  if (!isFinite(returnable)) {
    return 0;
  } else {
    return returnable * 96;
  }
};
const getBaseloadByDays = (data) => {
  let currentDate = null;
  let daysBaseloads = [];
  let day = [];
  const lastRow = data.pop();
  data.forEach((row) => {
    const date = new Date(row.time.replace(' ', 'T'));
    if (currentDate == null) {
      currentDate = date;
    }
    if (date.getDay() == currentDate.getDay()) {
      day.push(row);
      if (row == lastRow) {
        daysBaseloads.push(getBaseloadByDay(day));
      }
    } else {
      daysBaseloads.push(getBaseloadByDay(day));
      day = [];
      currentDate = date;
    }
  });
  const returnable =
    daysBaseloads.reduce((a, b) => a + b, 0) / daysBaseloads.length;
  if (!isFinite(returnable)) {
    return 0;
  } else {
    return returnable * 7;
  }
};

export { getBaseloadByDay, getBaseloadByDays };
