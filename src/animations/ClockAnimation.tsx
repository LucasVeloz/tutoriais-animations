import React from 'react'
import { addMinutes, format, startOfDay, subSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {  interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props  {
  children: string;
}


const Animation = ({ children }: Props) => {
  const y = useSharedValue(0);

  useEffect(() => {
    y.value = withTiming(50, {
      duration: 750
    }, (finished) => {
      if (finished) {
        y.value = -50;
        y.value = withTiming(0, {
          duration: 300
        });
      }
    })
  }, [children])


  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: y.value}
    ],
    opacity: interpolate(y.value, [-100, 0, 50], [0, 1, 0])
  }))

  return <Animated.Text style={rStyle}>{children}</Animated.Text>
}


export const ClockAnimation = () => {
  const [state, setState] = useState((addMinutes(startOfDay(new Date()), 3)))

  useEffect(() => {
    var interval = setInterval(() => {
      if (format(state, 'mm:ss') === '00:00') {
        return () => clearInterval(interval);
      }
      setState(oldState => subSeconds(oldState, 1))
    }, 1000)
    
    return () => clearInterval(interval);
  }, [state])

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        {React.Children.toArray(format(state, 'mm:ss').split('').map((item) => (
          <Animation>{item}</Animation>
        )))}
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    flexDirection: 'row',
  }
});
