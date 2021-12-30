import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const WarningsList = (props) => {
  return (
    <FlatList
      data={props.warningsData}
      keyExtractor={(item, index) => item.time}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      ListHeaderComponent={
        <View>
          <Text style={styles.headerText}>Warnings from last 12h</Text>
        </View>
      }
      renderItem={({ item }) => {
        let consumptionColor =
          item.changePct == 0 ? 'grey' : item.changePct < 0 ? '#1ec71e' : 'red';
        return (
          <TouchableOpacity style={styles.mainCardView}>
            {/* Warning Icon */}
            <View>
              <AntDesign
                name='warning'
                size={24}
                color={
                  item.changePct == 0
                    ? 'grey'
                    : item.changePct < -5 || item.changePct > 5
                    ? '#cc3300'
                    : '#ffcc00'
                }
              />
            </View>
            {/* Warning Title */}
            <View>
              <Text style={{ fontWeight: 'bold' }}>
                {item.lastTime} - {item.time}
              </Text>
              <Text>{item.title}</Text>
            </View>

            {/* Value */}
            <View>
              <Text style={styles.valueText}>{item.changeValue} kWh</Text>
              {/* Arrow icon and percentage */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                {item.changePct < 0 ? (
                  <Feather name='arrow-down-right' size={18} color='#1ec71e' />
                ) : (
                  <Feather name='arrow-up-right' size={18} color='red' />
                )}
                <Text
                  style={{
                    marginLeft: 1,
                    color: consumptionColor,
                    lineHeight: 15,
                    fontSize: 12,
                  }}
                >
                  {item.changePct}%
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      ListFooterComponent={<View style={{ marginBottom: 20 }} />}
      ListEmptyComponent={<Text style={{ height: 100 }}>No warnings</Text>}
    />
  );
};

export default WarningsList;

const styles = StyleSheet.create({
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueText: {
    textAlign: 'right',
    color: '#000',
  },
  mainCardView: {
    height: 65,
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
    flexDirection: 'row',
  },
});
