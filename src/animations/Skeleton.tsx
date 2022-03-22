import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';


const { width } = Dimensions.get('window');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const Skeleton = () => {
  const x = useSharedValue(0);

  useEffect(() => {
    x.value = withRepeat(withTiming(1, { duration: 2000 }), -1)
  }, [])

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: interpolate(x.value, [0, 1], [-width, width])}
    ]
  }))

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <AnimatedLinearGradient 
          colors={['grey', 'red', 'grey']} 
          style={[{...StyleSheet.absoluteFillObject}, rStyle]} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 100,
    borderRadius: 8,
    backgroundColor: 'grey',
    overflow: 'hidden'
  }
})