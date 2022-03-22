import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LayoutChangeEvent, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window')
export const MoveTitleAnimation = () => {
  const x = useSharedValue(0);


  useEffect(() => {
    x.value = withRepeat(withTiming(-(width * 2),{ duration: 3500}), -1, true)
  }, [])


  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: x.value}
    ]
  }))

  return (
    <View style={styles.container}>
      <Animated.Text 
        numberOfLines={1} 
        selectable
        style={[styles.text, rStyle]}
      >
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Error quae placeat harum,
        consectetur voluptatibus vel, aut eos veniam
        possimus earum, modi inventore odio
        dignissimos. Nulla illum exercitationem unde
        quae saepe.
      </Animated.Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    padding: 20,
    width: '1000%'
  }
})