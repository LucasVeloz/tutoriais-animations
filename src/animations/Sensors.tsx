import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// import { Container } from './styles';

export const Sensors = () => {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, { interval: 10 }); // <- initialization
  const style = useAnimatedStyle(() => ({
      transform: [
        {perspective: 1000},
        {rotateX: withTiming(`${animatedSensor.sensor.value.pitch * 1000}deg`)},
        {rotateY: withTiming(`${-animatedSensor.sensor.value.yaw * 1000}deg`)},
        {rotateZ: withTiming(`${animatedSensor.sensor.value.roll * 1000}deg`)},
      ],
    }
  ));
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, style]} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  }
})