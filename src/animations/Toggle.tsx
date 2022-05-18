import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const THUMB_SIZE = 50;
const DEFAULT_WITH_TIMING_CONFIG = { duration: 200 };
export const Toggle = () => {
  const [toggleContainerWidth, setToggleContainerWidth] = useState(0);
  const isActive = useSharedValue(0);

  const gesture = Gesture.Tap().onStart(() => {
    isActive.value = isActive.value ? 0 : 1;
  })

  const onLayoutToggleContainer = (e: LayoutChangeEvent) => {
    setToggleContainerWidth(e.nativeEvent.layout.width);
  }

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: withTiming(isActive.value ? toggleContainerWidth - THUMB_SIZE : 0, DEFAULT_WITH_TIMING_CONFIG)}
    ],
    backgroundColor: 'white'
  }));

  const containerStyle = useAnimatedStyle(() => ({
    height: THUMB_SIZE,
    width: withTiming(isActive.value ? toggleContainerWidth : 0, DEFAULT_WITH_TIMING_CONFIG),
    backgroundColor: 'green'
  }));

  const firstLine = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(isActive.value,[0,1], ['#ff0066', 'green']),

  }));
  const secondLine = useAnimatedStyle(() => ({
    height: withTiming(isActive.value ? 5 : 20, DEFAULT_WITH_TIMING_CONFIG),
    backgroundColor: interpolateColor(isActive.value,[0,1], ['#ff0066', 'green']),
    transform: [
      {rotate: '-40deg'},
      {translateX: withTiming(isActive.value ? -8 : 0, DEFAULT_WITH_TIMING_CONFIG)},
    ]
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View 
          onLayout={onLayoutToggleContainer}
          style={styles.toggleContainer} 
        >
          <Animated.View style={containerStyle} />
          <Animated.View style={[styles.thumb, rStyle]}>
            <Animated.View style={[styles.line1, firstLine]} />
            <Animated.View style={[styles.line2, secondLine]} />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    width: '30%',
    height: THUMB_SIZE,
    borderRadius: 25,
    backgroundColor: '#ff0066',
    overflow: 'hidden',
  },
  thumb: {
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    borderRadius: THUMB_SIZE/2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line1: {
    height: 20,
    borderRadius: 10,
    width: 3,
    transform: [
      {rotate: '40deg'}
    ]
  },
  line2: {
    position: 'absolute',
    width: 3,
    borderRadius: 10,
  },
});
