import React from 'react';
import { Dimensions } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';

const StackedChart = (props) => {
  const data = {
    labels: props.labels,
    legend: ['Baseload', 'Variable load'],
    data: props.config,
    barColors: ['#ffcccb', '#ff726f'],
  };

  return (
    <StackedBarChart
      data={data}
      width={Dimensions.get('window').width - props.margin}
      height={220}
      style={{ borderRadius: 16 }}
      withHorizontalLabels={false}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
        barPercentage: 1.3,
      }}
    />
  );
};

export default StackedChart;
