import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Amplify from 'aws-amplify';
// import awsconfig from './src/aws-exports';
// import { withAuthenticator } from 'aws-amplify-react-native';
import getWarnings from './data/warnings';

var moment = require('moment');

moment().format();

//Import custom theme for authenticator
// import customTheme from './src/Theme/CustomTheme';

//Import data related components
import {
  getDataQueries,
  getWeekDataQueries,
  getDayQueries,
} from './data/queries.js';
import {
  createChartConfig,
  createBarChartConfig,
  createHeatMapConfig,
  createBudgetDailyConfig,
} from './data/charts.js';
import data from './data/data.js';

//Import components
import DrawerNavigator from './src/navigation/DrawerNavigator';

// Amplify.configure(awsconfig);

/*
PaperProvider = gives access to Material UI components
NavigationContainer = links top-level navigator to the app environment
DrawerNavigation = main navigator element
*/

const App = () => {
  const [incomingMainsPast24Hours, setIncomingMainsPast24Hours] = useState([]);

  const [incomingMainsPast3Hours, setIncomingMainsPast3Hours] = useState([]);
  const [risingBusbarPast24Hours, setRisingBusbarPast24Hours] = useState([]);
  const [lift1Past24Hours, setLift1Past24Hours] = useState([]);
  const [lift2Past24Hours, setLift2Past24Hours] = useState([]);
  const [lift3Past24Hours, setLift3Past24Hours] = useState([]);
  const [umbrellaDBPast24Hours, setUmbrellaDBPast24Hours] = useState([]);
  const [DBL1Past24Hours, setDBL1Past24Hours] = useState([]);
  const [DBL2Past24Hours, setDBL2Past24Hours] = useState([]);
  const [BEP5Past24Hours, setBEP5Past24Hours] = useState([]);
  const [sprinklerPumpPast24Hours, setSprinklerPumpPast24Hours] = useState([]);
  const [MCC1Past24Hours, setMCC1Past24Hours] = useState([]);
  const [MCC2Past24Hours, setMCC2Past24Hours] = useState([]);
  const [MCC3Past24Hours, setMCC3Past24Hours] = useState([]);
  const [MCC4Past24Hours, setMCC4Past24Hours] = useState([]);
  const [MCC5Past24Hours, setMCC5Past24Hours] = useState([]);
  const [kitchenAHUPast24Hours, setKitchenAHUPast24Hours] = useState([]);
  const [incomingMainsDay1, setincomingMainsDay1] = useState([]);
  const [incomingMainsDay2, setincomingMainsDay2] = useState([]);
  const [incomingMainsDay3, setincomingMainsDay3] = useState([]);
  const [incomingMainsDay4, setincomingMainsDay4] = useState([]);
  const [incomingMainsDay5, setincomingMainsDay5] = useState([]);
  const [incomingMainsDay6, setincomingMainsDay6] = useState([]);
  const [incomingMainsDay7, setincomingMainsDay7] = useState([]);
  const [incomingMainsCurrentWeek, setIncomingMainsCurrentWeek] = useState([]);
  const [incomingMainsLastWeek, setIncomingMainsLastWeek] = useState([]);
  const [incomingMainsWeek3, setIncomingMainsWeek3] = useState([]);
  const [incomingMainsWeek4, setIncomingMainsWeek4] = useState([]);
  const [warningsData, setWarningsData] = useState([]);
  const [incomingMainsWeek5, setIncomingMainsWeek5] = useState([]);
  const [heatMapChartConfig, setHeatMapChartConfig] = useState([]);

  const warningsDataQuery = `SELECT * FROM "metersdemo"."mqtt_consumer" WHERE name = \'EM996001_IncomingMains\' AND time between ago(12h) and now() ORDER BY time ASC`;

  useEffect(async () => {
    const states = [
      setIncomingMainsPast24Hours,
      setRisingBusbarPast24Hours,
      setLift1Past24Hours,
      setLift2Past24Hours,
      setLift3Past24Hours,
      setUmbrellaDBPast24Hours,
      setDBL1Past24Hours,
      setDBL2Past24Hours,
      setBEP5Past24Hours,
      setSprinklerPumpPast24Hours,
      setMCC1Past24Hours,
      setMCC2Past24Hours,
      setMCC3Past24Hours,
      setMCC4Past24Hours,
      setMCC5Past24Hours,
      setKitchenAHUPast24Hours,
    ];

    const queries = getDataQueries([
      'EM996001_IncomingMains',
      'EM996003_RisingBusbar',
      'EM996004_Lift1',
      'EM996005_Lift2',
      'EM996006_Lift3',
      'EM996007_UmbrellaDB',
      'EM996008_DBL1',
      'EM996009_DBL2',
      'EM996010_BEP5',
      'EM996011_SprinklerPump',
      'EM046001_MCC1',
      'EM046002_MCC2',
      'EM996012_MCC3',
      'EM996013_MCC4',
      'EM996014_MCC5',
      'EM006001_KitchenAHU',
    ]);

    await data(warningsDataQuery, setWarningsData);

    //set data of last 24hours to every sensors state
    queries.forEach(async (query, index) => {
      await data(query, states[index]);
    });

    const incomingMainsPast3HoursQuery = `SELECT * FROM "metersdemo"."mqtt_consumer" WHERE name = \'EM996001_IncomingMains\' AND time between ago(2h) and now() ORDER BY time ASC`;
    await data(incomingMainsPast3HoursQuery, setIncomingMainsPast3Hours);

    const weekQueries = getWeekDataQueries(5);
    const weekStates = [
      setIncomingMainsCurrentWeek,
      setIncomingMainsLastWeek,
      setIncomingMainsWeek3,
      setIncomingMainsWeek4,
      setIncomingMainsWeek5,
    ];

    // set weeks data to every weeks' state
    weekQueries.forEach(async (query, index) => {
      await data(query, weekStates[index]);
    });

    const dayQueries = getDayQueries(7);
    const dayStates = [
      setincomingMainsDay1,
      setincomingMainsDay2,
      setincomingMainsDay3,
      setincomingMainsDay4,
      setincomingMainsDay5,
      setincomingMainsDay6,
      setincomingMainsDay7,
    ];

    // set days data to every days' state
    dayQueries.forEach(async (query, index) => {
      await data(query, dayStates[index]);
    });

    const heatMapChartData = await createHeatMapConfig();
    setHeatMapChartConfig(heatMapChartData);
  }, []);

  const bezierLineChartConfig = createChartConfig(
    incomingMainsPast3Hours,
    'kWh'
  );
  const todayVsYesterdayBarConfig = createBarChartConfig(
    [
      incomingMainsDay7,
      incomingMainsDay6,
      incomingMainsDay5,
      incomingMainsDay4,
      incomingMainsDay3,
      incomingMainsDay2,
      incomingMainsDay1,
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
  const lastWeeksVsCurrentWeekBarConfig = createBarChartConfig(
    [
      incomingMainsWeek5,
      incomingMainsWeek4,
      incomingMainsWeek3,
      incomingMainsLastWeek,
    ],
    [
      'Week ' + (moment().isoWeek() - 4),
      'Week ' + (moment().isoWeek() - 3),
      'Week ' + (moment().isoWeek() - 2),
      'Week ' + (moment().isoWeek() - 1),
    ],
    'kWh'
  );

  const incomingMainChart = createChartConfig(incomingMainsPast24Hours, 'kWh');
  const risingBusbarChart = createChartConfig(risingBusbarPast24Hours, 'kWh');
  const lift1Chart = createChartConfig(lift1Past24Hours, 'kWh');
  const lift2Chart = createChartConfig(lift2Past24Hours, 'kWh');
  const lift3Chart = createChartConfig(lift3Past24Hours, 'kWh');
  const umbrellaDBChart = createChartConfig(umbrellaDBPast24Hours, 'kWh');
  const DBL1Chart = createChartConfig(DBL1Past24Hours, 'kWh');
  const DBL2Chart = createChartConfig(DBL2Past24Hours, 'kWh');
  const BEP5Chart = createChartConfig(BEP5Past24Hours, 'kWh');
  const sprinklerPumpChart = createChartConfig(sprinklerPumpPast24Hours, 'kWh');
  const MCC1Chart = createChartConfig(MCC1Past24Hours, 'kWh');
  const MCC2Chart = createChartConfig(MCC2Past24Hours, 'kWh');
  const MCC3Chart = createChartConfig(MCC3Past24Hours, 'kWh');
  const MCC4Chart = createChartConfig(MCC4Past24Hours, 'kWh');
  const MCC5Chart = createChartConfig(MCC5Past24Hours, 'kWh');
  const kitchenAHUChart = createChartConfig(kitchenAHUPast24Hours, 'kWh');
  const warningsList = getWarnings(warningsData);

  const homeScreenConfig = {
    incomingMainChart,
    risingBusbarChart,
    lift1Chart,
    lift2Chart,
    lift3Chart,
    umbrellaDBChart,
    DBL1Chart,
    DBL2Chart,
    BEP5Chart,
    sprinklerPumpChart,
    MCC1Chart,
    MCC2Chart,
    MCC3Chart,
    MCC4Chart,
    MCC5Chart,
    kitchenAHUChart,
  };

  const baseloadData = [
    incomingMainsCurrentWeek,
    incomingMainsLastWeek,
    incomingMainsWeek3,
    incomingMainsWeek4,
    incomingMainsDay7,
    incomingMainsDay6,
    incomingMainsDay5,
    incomingMainsDay4,
    incomingMainsDay3,
    incomingMainsDay2,
    incomingMainsDay1,
  ];

  const budgetDataDailyConfig = createBudgetDailyConfig([
    incomingMainsWeek4,
    incomingMainsWeek3,
    incomingMainsLastWeek,
    incomingMainsCurrentWeek,
  ]);

  const homeBudgetConfig = createBudgetDailyConfig([incomingMainsCurrentWeek]);
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar backgroundColor='#2b3341' barStyle='light-content' />
        <DrawerNavigator
          baseload={baseloadData}
          budgetData={lastWeeksVsCurrentWeekBarConfig}
          budgetDataDaily={budgetDataDailyConfig}
          homeScreenConfig={homeScreenConfig}
          homeBudgetConfig={homeBudgetConfig}
          bezierLineChartConfig={bezierLineChartConfig}
          todayVsYesterdayBarConfig={todayVsYesterdayBarConfig}
          lastWeeksVsCurrentWeekBarConfig={lastWeeksVsCurrentWeekBarConfig}
          warningsData={warningsList}
          heatMapChartConfig={heatMapChartConfig}
        />
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
// export default withAuthenticator(App, false, [], null, customTheme);
