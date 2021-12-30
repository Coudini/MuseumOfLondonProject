import React from 'react';
import { Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const Progress = () => {
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(203, 0, 68, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#008d90',
    },
    useShadowColorFromDataset: false, // optional
  };
  const data = {
    labels: ['Last week', 'Current week'], // optional
    data: [0.4, 0.7],
  };
  return (
    <ProgressChart
      data={data}
      width={Dimensions.get('window').width - 30}
      height={220}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegend={false}
    />
  );
};

export default Progress;
