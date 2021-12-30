// Calculate the change in percentages
const getPercentageChange = (lastValue, currentValue) => {
  const change = currentValue - lastValue;
  const pctChange = ((change / lastValue) * 100).toFixed(2);
  return parseFloat(pctChange);
};

// Calculate the change in values
const getValueChange = (lastValue, currentValue) => {
  return parseFloat(currentValue - lastValue).toFixed(2);
};

// Get average of last value, current value and next value
const getAverage = (lastValue, currValue, nextValue) => {
  return parseFloat((lastValue + currValue + nextValue) / 3);
};

// Build warning object
const buildWarning = (
  title,
  time,
  lastTime,
  energyConsumption,
  pctDifference,
  valueDifference
) => {
  return {
    title,
    time,
    lastTime,
    energyConsumption,
    changePct: pctDifference,
    changeValue: valueDifference,
  };
};

// Check for anomalies with certain threshold
const isAnomaly = (change) => {
  if (change > 2 || change < -2) {
    return true;
  }
  return false;
};

// Get title of warning depending on value change
const getTitle = (changeValue) => {
  return changeValue > 0
    ? 'Energy Consumption Increase'
    : 'Energy Consumption Decrease';
};

const getWarnings = (data) => {
  const warningsData = [];
  const labels = [];
  let lastValue = 0;
  let lastEnergyConsumption = 0;
  let lastTime = '';

  // separate data
  data.forEach((row, index) => {
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
      const changeInPercentage = getPercentageChange(
        lastEnergyConsumption,
        energyConsumption
      );
      const changeInValue = getValueChange(
        lastEnergyConsumption,
        energyConsumption
      );
      const title = getTitle(changeInValue);
      labels.push(time);

      // To calculate average of last, current and next value
      // we need to find the next value and because there are
      // multiple values for the same minute we need to check forward
      // until we get a value with a different timestamp.
      let found = false;
      let nextValue;
      for (let i = 1; !found; i++) {
        const next = data[index + i];
        // Check if we are out of bounds of the data array
        if (typeof next !== 'undefined') {
          const date = new Date(next.time.replace(' ', 'T'));
          const nextTime =
            date.getHours() +
            ':' +
            (date.getMinutes() == 0 ? '00' : date.getMinutes());
          let value = parseFloat(next['measure_value::double']);

          // Check if next index has different time and if so save the value
          if (nextTime != time) {
            nextValue = value;
            found = true;
          }
          // If out of bounds, break from loop, the end has been reached
        } else {
          break;
        }
      }

      // Calculate average
      let avg;
      const nextEnergyConsumption = nextValue - value;
      avg = getAverage(
        lastEnergyConsumption,
        energyConsumption,
        nextEnergyConsumption
      );

      const pctDifference = getPercentageChange(avg, energyConsumption);
      const valueDifference = getValueChange(avg, energyConsumption);

      // Create a warning if anomaly
      if (isAnomaly(pctDifference)) {
        const warning = buildWarning(
          title,
          time,
          lastTime,
          energyConsumption,
          pctDifference,
          valueDifference
        );

        warningsData.push(warning);
      }
      lastEnergyConsumption = energyConsumption;
      lastValue = value;
      lastTime = time;
    }
  });
  // Remove the first and second value as change in value
  // cannot be calculated
  warningsData.splice(0, 2);

  // Return the reversed array to show the most recent warning first
  return warningsData.reverse();
};

export default getWarnings;
