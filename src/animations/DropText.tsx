import React, { ReactNode, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';


interface Props {
  children: ReactNode;
  index: number;
}

const AnimatedText = ({ children, index }:Props) => {
  const value = React.useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 200),
      Animated.spring(value, {
        toValue: 1,
        useNativeDriver: true,
      })
    ]).start()
  }, []);
  return (
    <Animated.Text 
      style={{ 
        opacity: value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        }), 
        transform: [
          {translateY: value.interpolate({
            inputRange: [0, 1], 
            outputRange: [-50, 0]
          })}
        ],
        fontSize: 50,
      }}>{children}</Animated.Text>
  )
}

export const DropText = () => {
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
