import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';

// Import components
import { getBaseloadByDay, getBaseloadByDays } from '../../data/baseload.js';
import { createBaseloadChartConfig } from '../../data/charts.js';
import StackedChart from '../Components/StackedBarChart';
import HeatMap from '../Components/HeatMap';
import BarChart from '../Components/BarChart';

var moment = require('moment');

moment().format();

const BaseloadScreen = (props) => {
  // BASELOAD vs VARIABLE LOAD Calculation
  // Extract data for the daily StackedChart
  const variableLoadYesterday =
    props.todayVsYesterdayBarConfig.chartData[6] -
    getBaseloadByDay(props.baseload[4]).toFixed(0);
  const variableDayBeforeYesterday =
    props.todayVsYesterdayBarConfig.chartData[5] -
    getBaseloadByDay(props.baseload[5]).toFixed(0);
  const dayStackedChart = [
    [
      parseFloat(getBaseloadByDay(props.baseload[5]).toFixed(0)),
      parseFloat(variableDayBeforeYesterday),
    ],
    [
      parseFloat(getBaseloadByDay(props.baseload[4]).toFixed(0)),
      parseFloat(variableLoadYesterday),
    ],
  ];

  // Extract data for weekly stacked chart
  const variableLoadLastWeek =
    props.lastWeeksVsCurrentWeekBarConfig.chartData[1] -
    getBaseloadByDays(props.baseload[1]).toFixed(0);
  const variableLoadWeekBeforeLast =
    props.lastWeeksVsCurrentWeekBarConfig.chartData[2] -
    getBaseloadByDays(props.baseload[2]).toFixed(0);

  const weeksStackedChart = [
    [
      parseFloat(getBaseloadByDays(props.baseload[2]).toFixed(0)),
      parseFloat(variableLoadWeekBeforeLast),
    ],
    [
      parseFloat(getBaseloadByDays(props.baseload[1]).toFixed(0)),
      parseFloat(variableLoadLastWeek),
    ],
  ];

  const todayVsYesterdayConfig = createBaseloadChartConfig(
    [
      getBaseloadByDay(props.baseload[10]),
      getBaseloadByDay(props.baseload[9]),
      getBaseloadByDay(props.baseload[8]),
      getBaseloadByDay(props.baseload[7]),
      getBaseloadByDay(props.baseload[6]),
      getBaseloadByDay(props.baseload[5]),
      getBaseloadByDay(props.baseload[4]),
    ],
    [
      moment()
        .day(moment().weekday() - 7)
        .format('ddd'),
      moment()
        .day(moment().weekday() - 6)
        .format('ddd'),
      moment()
        .day(moment().weekday() - 5)
        .format('ddd'),
      moment()
        .day(moment().weekday() - 4)
        .format('ddd'),
      moment()
        .day(moment().weekday() - 3)
        .format('ddd'),
      moment()
        .day(moment().weekday() - 2)
        .format('ddd'),
      moment()
        .day(moment().weekday() - 1)
        .format('ddd'),
    ],
    'kWh'
  );
  const thisVsLastWeekConfig = createBaseloadChartConfig(
    [
      getBaseloadByDays(props.baseload[3]),
      getBaseloadByDays(props.baseload[2]),
      getBaseloadByDays(props.baseload[1]),
      getBaseloadByDays(props.baseload[0]),
    ],
    [
      'Week ' + (moment().isoWeek() - 3),
      'Week ' + (moment().isoWeek() - 2),
      'Week ' + (moment().isoWeek() - 1),
      'Week ' + moment().isoWeek(),
    ],
    'kWh'
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainCardView}>
          <Headline style={styles.headline}>
            Baseload vs Variable Load (kWh)
          </Headline>
          <Paragraph>Last two full days</Paragraph>
          {dayStackedChart.length ? (
            <StackedChart
              config={dayStackedChart}
              labels={[
                moment()
                  .day(moment().weekday() - 2)
                  .format('ddd'),
                moment()
                  .day(moment().weekday() - 1)
                  .format('ddd'),
              ]}
              margin={12}
            />
          ) : null}
        </View>
        <View style={styles.mainCardView}>
          <Headline style={styles.headline}>
            Baseload vs Variable Load (kWh)
          </Headline>
          <Paragraph>Last two full weeks</Paragraph>
          {weeksStackedChart.length ? (
            <StackedChart
              config={weeksStackedChart}
              labels={[
                'Week ' + (moment().isoWeek() - 2),
                'Week ' + (moment().isoWeek() - 1),
              ]}
              margin={12}
            />
          ) : null}
        </View>
        <View style={styles.mainCardView}>
          <Headline style={styles.headline}>Day comparison (kWh)</Headline>
          {todayVsYesterdayConfig.chartData.length ? (
            <BarChart
              config={todayVsYesterdayConfig}
              margin={12}
              timeframe={'day'}
            />
          ) : null}
        </View>
        <View style={styles.mainCardView}>
          <Headline style={styles.headline}>Week comparison (kWh)</Headline>
          {thisVsLastWeekConfig.chartData.length ? (
            <BarChart
              config={thisVsLastWeekConfig}
              margin={12}
              timeframe={'week'}
            />
          ) : null}
        </View>
        <View style={styles.mainCardView}>
          <Headline style={styles.headline}>Daily kWh usage</Headline>
          {props.heatMapChartConfig.length ? (
            <HeatMap config={props.heatMapChartConfig} margin={12} />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default BaseloadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 6,
  },
  divider: {
    backgroundColor: 'lightgrey',
    height: 2,
    width: '90%',
    marginVertical: 5,
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 6,
    color: '#000',
  },
  mainCardView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 6,
    marginRight: 6,
  },
});
