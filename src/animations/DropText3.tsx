import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const DropText3 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
      {'olá mundo!'.split('').map((item, index) => (
        <Animated.Text 
          key={index} 
          entering={FadeInUp.delay(100 * index)}
          style={{ fontSize: 30 }}
        >{item}
        </Animated.Text>
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
