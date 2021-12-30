import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const BarGraph = ({ config, margin, timeframe }) => {
  const data = {
    labels: config.chartLabels,
    datasets: [
      {
        data: config.chartData,
      },
    ],
  };

  const barWidth = timeframe === 'day' ? 0.85 : 1.3;

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(44, 40, 109, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
    barPercentage: barWidth,
  };
  return (
    <BarChart
      data={data}
      width={Dimensions.get('window').width - margin}
      height={220}
      fromZero={true}
      withInnerLines={false}
      withHorizontalLabels={false}
      showValuesOnTopOfBars={true}
      style={{ borderRadius: 16, paddingRight: 0 }}
      chartConfig={chartConfig}
    />
  );
};

export default BarGraph;
