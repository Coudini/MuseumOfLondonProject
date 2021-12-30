import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import components
import WarningsList from '../Components/WarningsList';

const HomeScreen = (props) => {
  const priceKey = '@price';
  const budgetKey = '@budget';
  const [price, setPrice] = useState(0.174);
  const [budget, setBudget] = useState(3500);
  const [calculation, setCalculation] = useState(100);

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

  const calculateBudget = (p, b, data) => {
    if (data.chartData.length > 0) {
      let pr = 0;
      data.chartData.forEach((consumption) => {
        pr += parseFloat(consumption) * p;
      });
      return ((pr / b) * 100).toFixed(1);
    }
  };

  useEffect(() => {
    async function initBudget() {
      await readData(priceKey);
      await readData(budgetKey);
      setCalculation(calculateBudget(price, budget, props.homeBudgetConfig));
    }

    initBudget();
  }, [price, budget, calculation, props]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.mainInfo}>
          {props.homeBudgetConfig?.chartData?.length ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.headerText}>Weekly budget</Text>

              <Text
                style={
                  calculation < 100
                    ? { color: '#1ec71e', fontSize: 20, fontWeight: 'bold' }
                    : { color: 'red', fontSize: 20, fontWeight: 'bold' }
                }
              >
                {calculation}%
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <WarningsList warningsData={props.warningsData} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#2b3341',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  mainInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  headerText: {
    color: 'grey',
    fontSize: 20,
  },
  valueText: {
    color: '#fff',
  },
  mainCardView: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 4,
    marginBottom: 4,
  },
});
