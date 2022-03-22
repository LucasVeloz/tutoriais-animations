import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';


const ITEMS = [
  [
    {
      id: 1,
      background: 'red'
    },
    {
      id: 2,
      background: 'blue'
    },
    {
      id: 3,
      background: 'black'
    },
    {
      id: 4,
      background: 'orange'
    },
  ],
  [
    {
      id: 5,
      background: 'red'
    },
    {
      id: 6,
      background: 'blue'
    },
    {
      id: 7,
      background: 'black'
    },
    {
      id: 8,
      background: 'orange'
    },
  ],
];


type IItem = {
  id: number;
  background: string;
}


interface ItemProps {
  data: IItem;
}
interface Props {
  data: IItem[]
}



const Item = ({ data }: ItemProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const ctxX = useSharedValue(0);
  const ctxY = useSharedValue(0);

  const [isActive, setIsActive] = useState(false);


  const rStyle = useAnimatedStyle(() => ({
    // zIndex: isActive ? 9999 : data.id,
    backgroundColor: data.background,
    position: 'absolute',
    transform: [
      {translateX: x.value},
      {translateY: y.value},
    ]
  }))

  const gesture = Gesture.Pan()
  .onStart(() => {
    ctxX.value = x.value;
    ctxY.value = y.value;
    runOnJS(setIsActive)(true);
  })
  .onUpdate((e) => {
    console.log(e.translationX, e.translationY)
    x.value = e.translationX + ctxX.value;
    y.value = e.translationY + ctxY.value;
  })
  .onEnd(() => {
    runOnJS(setIsActive)(false)
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View 
        style={[{
          bottom: data.id * 10
          
        },styles.item, rStyle]} 
      />
    </GestureDetector>
  )
};

const Column = ({ data }: Props) => {
  return (
    <View style={styles.column}>
      {React.Children.toArray(data.map(item => (
        <Item data={item} />
      )))}
    </View>
  )
};


export const MiniGame = () => {
  return (
    <View style={styles.container}>
      {React.Children.toArray(ITEMS.map(item => (
        <Column data={item} />
      )))}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  column: {
    backgroundColor: 'yellow',
    height: 100,
    width: 100,
    margin: 20,
  },
  item: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
})