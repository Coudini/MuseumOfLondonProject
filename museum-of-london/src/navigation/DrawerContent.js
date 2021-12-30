import React from 'react';
// import { Auth } from 'aws-amplify';

import { View, StyleSheet, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Title, Caption, Drawer, Text, Button } from 'react-native-paper';

const DrawerContent = (props) => {
  // Handle signing out
  // async function signOut() {
  //   try {
  //     await Auth.signOut();
  //   } catch (error) {}
  // }
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
    >
      <View style={styles.drawerContent}>
        <View style={styles.logoArea}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View style={styles.userInfoSection}>
          <Title style={styles.title}>Facility Manager</Title>
          <Caption style={styles.caption}>facility.manager@mol.uk</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          {/* DrawerItemList handles the rendering of all Drawer.Screens specified in DrawerNavigator file*/}
          <DrawerItemList {...props} />
        </Drawer.Section>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        {/* <Button style={styles.logoutButton} onPress={() => signOut()}>
          <Text style={{ color: '#fff', fontSize: 12 }}>Log Out</Text>
        </Button> */}
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    marginVertical: 25,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#b4b4b4',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 25,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#2c286d',
    padding: 3,
    alignItems: 'center',
    borderRadius: 6,
    color: '#fff',
    marginBottom: 25,
    width: '50%',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 120,
    height: 120,
    marginTop: 10,
  },
  logoArea: {
    alignItems: 'center',
  },
});
