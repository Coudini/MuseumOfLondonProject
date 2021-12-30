import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const BezierLineChart = ({ config, margin }) => {
  let index = 0;

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: config.chartLabels,
          datasets: [
            {
              data: config.chartData,
            },
          ],
        }}
        width={Dimensions.get('window').width - margin} // from react-native
        height={300}
        yAxisLabel=''
        yAxisSuffix={config.dataType}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(203, 0, 68, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#CB0044',
          },
        }}
        bezier
        style={{
          marginVertical: 4,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default BezierLineChart;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
