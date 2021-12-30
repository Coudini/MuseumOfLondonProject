import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';

const HeatMap = ({ config, margin }) => {
  let index = 0;
  // console.log(config);
  return (
    <ContributionGraph
      values={config}
      endDate={new Date(config[0].date)}
      numDays={config.length}
      width={Dimensions.get('window').width - margin}
      height={220}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(203, 0, 68, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
    />
  );
};

export default HeatMap;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
