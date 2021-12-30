import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';

const BudgetScreen = (props) => {
  const priceKey = '@price';
  const budgetKey = '@budget';

  const [price, setPrice] = useState(0.174);
  const [budget, setBudget] = useState(3500);

  const [chartPrice, setChartPrice] = useState([0, 0, 0, 0]);
  const [chartBudget, setChartBudget] = useState([0, 0, 0, 0]);

  //const [chartDailyLabels, setChartDailyLabels] = useState(['']);
  const [chartDailyPrice, setChartDailyPrice] = useState([0]);
  const [chartDailyBudget, setChartDailyBudget] = useState([0]);

  const dailyPrice = (data, pr) => {
    let temp = [];
    data.forEach((day) => {
      temp.push(day * parseFloat(pr));
    });
    return temp;
  };
  const dailyBudget = (data, bg) => {
    let temp = [];
    const dailyBudget = parseFloat(bg) / 7;
    data.forEach(() => {
      temp.push(dailyBudget);
    });
    return temp;
  };

  const saveData = async (k, v) => {
    try {
      await AsyncStorage.setItem(k, String(v));
    } catch (e) {
      console.log(e);
    }
  };

  const readData = async (k) => {
    try {
      const data = await AsyncStorage.getItem(k);
      if (data !== null && !isNaN(data)) {
        if (k == priceKey) {
          setPrice(Number(data));
        } else if (k == budgetKey) {
          setBudget(Number(data));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function initCharts() {
      await readData(priceKey);
      await readData(budgetKey);
      setChartPrice([
        budgetCalculation(price, props.budgetData.chartData[0]),
        budgetCalculation(price, props.budgetData.chartData[1]),
        budgetCalculation(price, props.budgetData.chartData[2]),
        budgetCalculation(price, props.budgetData.chartData[3]),
      ]);
      setChartBudget([budget, budget, budget, budget]);

      //setChartDailyLabels(props.budgetDataDaily.chartLabels);
      setChartDailyPrice(dailyPrice(props.budgetDataDaily.chartData, price));
      setChartDailyBudget(dailyBudget(props.budgetDataDaily.chartData, budget));
    }

    initCharts();
  }, [price, budget]);

  const onChangePrice = (p) => {
    if (!isNaN(p)) {
      p = Number(p);
      setPrice(p);
      saveData(priceKey, p);
      setChartPrice([
        budgetCalculation(p, props.budgetData.chartData[0]),
        budgetCalculation(p, props.budgetData.chartData[1]),
        budgetCalculation(p, props.budgetData.chartData[2]),
        budgetCalculation(p, props.budgetData.chartData[3]),
      ]);
      setChartDailyPrice(dailyPrice(props.budgetDataDaily.chartData, p));
    }
  };

  const onChangeBudget = (b) => {
    if (!isNaN(b)) {
      b = Number(b);
      setBudget(b);
      saveData(budgetKey, b);
      setChartBudget([b, b, b, b]);
      setChartDailyBudget(dailyBudget(props.budgetDataDaily.chartData, b));
    }
  };

  const budgetCalculation = (p, consumption) => {
    return parseFloat(p) * consumption;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.mainCardView}>
            {props.budgetData.chartLabels.length ? (
              <LineChart
                data={{
                  labels: props.budgetData.chartLabels,
                  datasets: [
                    {
                      data: chartPrice,
                      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    },
                    {
                      data: chartBudget,
                      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 12}
                height={220}
                yAxisSuffix={'£'}
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
                    r: '0',
                    strokeWidth: '2',
                    stroke: '#CB0044',
                  },
                }}
              />
            ) : null}
          </View>

          {/* <View style={styles.mainCardView}>
                    {props.budgetDataDaily.chartLabels.length ? (
                    <LineChart
                            data={{
                                labels: props.budgetDataDaily.chartLabels,
                                datasets: [
                                    {
                                        data: chartDailyPrice,
                                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
                                    },
                                    {
                                        data: chartDailyBudget,
                                        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`
                                    }
                                ]
                            }}
                            width={Dimensions.get('window').width - 12}
                            height={200}
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
                                    r: '0',
                                    strokeWidth: '2',
                                    stroke: '#CB0044',
                                },
                                
                            }}
                        />
                        ) : null}
                    </View> */}
        </View>
      </ScrollView>
      <View style={styles.footerTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.footerTopTxt}>Price</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.footerTopTxt}>Budget</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.footerTxt}>
            £ /{'\n'}
            kWh
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Input
            style={styles.input}
            value={String(price)}
            onChangeText={(pr) => onChangePrice(pr)}
          ></Input>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.footerTxt}>
            £ /{'\n'}
            week
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Input
            style={styles.input}
            value={String(budget)}
            onChangeText={(bg) => onChangeBudget(bg)}
          ></Input>
        </View>
      </View>
    </View>
  );
};

export default BudgetScreen;

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
  footer: {
    width: '100%',
    height: 70,
    backgroundColor: '#2c286d',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerTop: {
    width: '100%',
    height: 30,
    backgroundColor: '#2c286d',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    marginTop: 15,
    width: '100%',
    //margin: 15,
    color: 'white',
    //borderRadius: '10px',
    textAlign: 'center',
  },
  footerTxt: {
    fontSize: 16,
    //fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
    textAlign: 'center',
  },
  footerTopTxt: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
    //textAlign: 'center'
  },
  input1: {
    justifyContent: 'flex-start',
  },
  input2: {
    justifyContent: 'flex-end',
  },
});
