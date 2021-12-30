import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import GraphScreen from '../screens/GraphScreen';
import BaseloadScreen from '../screens/BaseloadScreen';
import BudgetScreen from '../screens/BudgetScreen';

// Import components
// DrawerContent is the customized content of the DrawerNavigation
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 225, height: '100%' }}
      source={require('../../assets/logotype-mol2.png')}
    />
  );
};

/*
Drawer.Navigator component receivees custom content: 'DrawerContent' and screens are given as props
Drawer.Screen = navigatable screen
*/
const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#CB0044',
        drawerActiveBackgroundColor: '#2c286d',
        drawerInactiveTintColor: 'grey',
        drawerStyle: {
          backgroundColor: '#2b3341',
        },
        drawerLabelStyle: {
          color: '#fff',
          marginLeft: 0,
        },
        headerStyle: {
          backgroundColor: '#2c286d',
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitleStyle: {
          fontSize: 16,
        },
        drawerItemStyle: {
          width: '100%',
          marginLeft: 0,
          paddingLeft: 6,
          paddingVertical: 2,
          borderRadius: 0,
        },
        headerTintColor: '#fff',
        headerRight: (props) => <LogoTitle {...props} />,
      }}
    >
      <Drawer.Screen
        name='Home'
        children={() => (
          <HomeScreen
            config={props.bezierLineChartConfig}
            homeScreenConfig={props.homeScreenConfig}
            homeBudgetConfig={props.homeBudgetConfig}
            warningsData={props.warningsData}
          />
        )}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name='Total Energy'
        children={() => (
          <GraphScreen
            config={props.bezierLineChartConfig}
            todayVsYesterdayBarConfig={props.todayVsYesterdayBarConfig}
            lastWeeksVsCurrentWeekBarConfig={
              props.lastWeeksVsCurrentWeekBarConfig
            }
            heatMapChartConfig={props.heatMapChartConfig}
            homeScreenConfig={props.homeScreenConfig}
          />
        )}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name='chart-bar' color={color} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name='Baseload'
        children={() => (
          <BaseloadScreen
            baseload={props.baseload}
            config={props.bezierLineChartConfig}
            todayVsYesterdayBarConfig={props.todayVsYesterdayBarConfig}
            lastWeeksVsCurrentWeekBarConfig={
              props.lastWeeksVsCurrentWeekBarConfig
            }
            heatMapChartConfig={props.heatMapChartConfig}
          />
        )}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name='chart-bar' color={color} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name='Budget'
        children={() => (
          <BudgetScreen
            budgetData={props.budgetData}
            budgetDataDaily={props.budgetDataDaily}
          />
        )}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name='chart-bar' color={color} size={20} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
