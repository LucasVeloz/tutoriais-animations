import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, Vibration, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';


const R = 1000 / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const SECONDS = 10;

export const TimerAnimation = () => {
  const { height, width } = useWindowDimensions();
  const number = useSharedValue(0);
  const [seconds, setSeconds] = useState(SECONDS);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 1000 * number.value,
  }))

  const handleFormat = (value: number) => {
    const formatedMinutes = String(Math.floor(value / 60)).padStart(2, '0');
    const formatedSeconds = String(value % 60).padStart(2, '0');

    return `${formatedMinutes}:${formatedSeconds}`
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        const newValue = (seconds - 1) * 1 / SECONDS;
        setSeconds(seconds - 1);
        number.value = withTiming(1 - newValue);
      } else {
        Vibration.vibrate([1000, 1000, 1000, 2000])
        clearInterval(interval);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [seconds])


  return (
    <View style={styles.container}>
      <Svg>
        <AnimatedCircle 
          r={R}  
          cx={width/2}
          cy={height/2 - 40}
          stroke="#ff0066"
          strokeWidth={20}
          strokeDasharray={1000}
          strokeLinecap="round"
          animatedProps={animatedProps}
        />
      </Svg>
      <Text style={styles.text}>{handleFormat(seconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121'
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 20
  }
})