import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ClockAnimation, DoubleTap, MiniGame, MoveTitleAnimation, Skeleton, TimerAnimation } from '../animations';

import { Home } from '../screens/Home';

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
      </Navigator>
    </NavigationContainer>
  )
}
