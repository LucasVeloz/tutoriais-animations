// import 'react-native-gesture-handler'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MiniGame } from './src/animations/MiniGame';
import { ClockAnimation } from './src/animations/ClockAnimation';
import { DoubleTap } from './src/animations/DoubleTap';
import { MoveTitleAnimation } from './src/animations/MoveTitleAnimation';
import { Skeleton } from './src/animations/Skeleton';
import { TimerAnimation } from './src/animations/TimerAnimation';
import { Routes } from './src/routes';


export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes />
    </GestureHandlerRootView>
  );
}
