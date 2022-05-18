import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Main } from '../screens/Main';
import { Secondary } from '../screens/Secondary';
import { View } from 'react-native';


const { Navigator, Screen } = createDrawerNavigator();

export const DrawerRoutes = () => {
  return ( 
    <Navigator drawerContent={(e) => <View style={{ flex: 1, backgroundColor: 'red'}} />}>
      <Screen name="main" component={Main} />
      <Screen name="secondary" component={Secondary} />
    </Navigator>
  );
}
