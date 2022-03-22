import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


export const DoubleTap = () => {

  const doubleTap = Gesture
    .Tap()
    .numberOfTaps(2)
    .onStart(() => {
      console.log('double tap')
    });

  const gestureHandler = doubleTap;

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gestureHandler}>
        <View style={styles.box}/>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 12,
    backgroundColor: '#ff0066'
  }
})
