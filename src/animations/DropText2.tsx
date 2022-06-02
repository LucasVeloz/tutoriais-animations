import React, { ReactNode, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';


interface Props {
  children: ReactNode;
  index: number;
}

const AnimatedText = ({ children, index }:Props) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withDelay(index * 100, withSpring(1))
  }, []);

  const rStyle = useAnimatedStyle(() => ({
    fontSize: 30,
    opacity: animation.value,
    transform: [
      {translateY: interpolate(animation.value, [0, 1], [-50, 0])}
    ]
  }), [])
  return (
    <Animated.Text 
      style={rStyle}>{children}</Animated.Text>
  )
}

export const DropText2 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
      {'olá mundo!'.split('').map((item, index) => (
        <AnimatedText 
          key={index} 
          index={index + 1}
        >{item}
        </AnimatedText>
      ))}
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
    flexDirection: 'row',
  }
});
