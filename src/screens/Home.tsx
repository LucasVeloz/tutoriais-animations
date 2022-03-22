import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { animation } from '../utils';


export const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {React.Children.toArray(animation.map((item, index) => (
        <Animated.View entering={FadeInLeft.delay(100 * index)}>
          <Pressable style={styles.item} onPress={() => navigation.navigate(item)}>
            <Text style={styles.text}>{item}</Text>
          </Pressable>
        </Animated.View>
      )))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  }
})