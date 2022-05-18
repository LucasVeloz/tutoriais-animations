import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const { width } = Dimensions.get('window');
export const Drawer2 = () => {
  const x = useSharedValue(-width);

  const gesture = Gesture.Pan().onUpdate(e => {
    if (e.translationX > 2) {
      x.value = withTiming(-width/2)
    }
    if (e.translationX < 2) {
      x.value = withTiming(-width)
      
    }
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: x.value}
    ]
  }))

  const rStyle2 = useAnimatedStyle(() => ({
    opacity: interpolate(x.value, [-width, -width/2], [0, 0.5]),
  }))


  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <Animated.View style={[styles.blackView, rStyle2]}>
            <Pressable onPress={() => x.value !== -width ? x.value = withTiming(-width) : null} style={[styles.container]} />
          </Animated.View>
          <Animated.View style={[styles.modal, rStyle]} />
        </View>
      </GestureDetector>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
  },
  blackView: {
    flex: 1,
    backgroundColor: 'black'
  }

})
