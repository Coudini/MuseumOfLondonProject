import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';

// Import components
import BezierLineChart from '../Components/BezierLineChart';
import HeatMap from '../Components/HeatMap';
import BarChart from '../Components/BarChart';

const GraphScreen = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainCardView}>
          <Headline style={styles.headline}>Energy Consumption</Headline>
          {props.config.chartData.length ? (
            <BezierLineChart config={props.config} margin={12} />
          ) : null}
        </View>
        <View style={styles.mainCardView}>
          <Headline style={styles.headline}>Day comparison (kWh)</Headline>
          {props.todayVsYesterdayBarConfig.chartData.length ? (
            <BarChart
              config={props.todayVsYesterdayBarConfig}
              margin={12}
              timeframe={'day'}
            />
          ) : null}
        </View>
        <View style={styles.mainCardView}>
          <Headline style={styles.headline}>Week comparison (kWh)</Headline>
          {props.todayVsYesterdayBarConfig.chartData.length ? (
            <BarChart
              config={props.lastWeeksVsCurrentWeekBarConfig}
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

export default GraphScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
