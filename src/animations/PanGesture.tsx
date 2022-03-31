import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export const PanGesture = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const ctxX = useSharedValue(0);
  const ctxY = useSharedValue(0);

  const gesture = Gesture.Pan().onStart(() => {
    ctxX.value = x.value;
    ctxY.value = y.value;
  }).onUpdate((event) => {
    x.value = event.translationX + ctxX.value;  
    y.value = event.translationY + ctxY.value;  
  })

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: x.value},
      {translateY: y.value},
    ]
  }))

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.box, rStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#ff0066',
    borderRadius: 8,
  }
})
