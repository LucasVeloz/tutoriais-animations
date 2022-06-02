import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ClockAnimation, DoubleTap, MiniGame, Modal, MoveTitleAnimation, PanGesture, Skeleton, TimerAnimation, TimerAnimation2 } from '../animations';

import { Home } from '../screens/Home';
import { DrawerRoutes } from './drawer.routes';
import { Drawer2 } from '../animations/Drawer2';
import { Toggle } from '../animations/Toggle';
import { BottomSheet } from '../animations/BottomSheet';
import { DropText } from '../animations/DropText';
import { DropText2 } from '../animations/DropText2';
import { DropText3 } from '../animations/DropText3';

const { Navigator, Screen } = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen name="ClockAnimation" component={ClockAnimation} />
        <Screen name="DoubleTap" component={DoubleTap} />
        <Screen name="MiniGame" component={MiniGame} />
        <Screen name="MoveTitleAnimation" component={MoveTitleAnimation} />
        <Screen name="Skeleton" component={Skeleton} />
        <Screen name="TimerAnimation" component={TimerAnimation} />
        <Screen name="TimerAnimation2" component={TimerAnimation2} />
        <Screen name="Modal" component={Modal} />
        <Screen name="PanGesture" component={PanGesture} />
        <Screen name="Drawer" component={DrawerRoutes} />
        <Screen name="Drawer2" component={Drawer2} />
        <Screen name="Toggle" component={Toggle} />
        <Screen name="BottomSheet" component={BottomSheet} />
        <Screen name="DropText" component={DropText} />
        <Screen name="DropText2" component={DropText2} />
        <Screen name="DropText3" component={DropText3} />
      </Navigator>
    </NavigationContainer>
  )
}
