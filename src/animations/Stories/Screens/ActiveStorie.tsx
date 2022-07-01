import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { 
  StyleSheet, 
  View,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ActiveStorieImage } from "../components/ActiveStorieImage";
import { useGlobalCTX } from "../contexts";

const { height, width } = Dimensions.get('window');

const PERSPECTIVE = 100;
const ANGLE = PERSPECTIVE/width/2;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const ActiveStorie = () => {
  const navigation = useNavigation();
  const { data, selectedIndex } = useGlobalCTX();
  const y = useSharedValue(0);
  const x = useSharedValue(0);
  const scrollViewRef = useRef<FlatList>(null);
  // const scrollViewRef = useRef<ScrollView>(null);

  const scrollToRightUserStories = () => {
    const newValue = selectedIndex * width;
  }

  const dismiss = () => {
    navigation.goBack();
  }

  const gesture = Gesture
    .Pan()
    .onUpdate(({ translationY }) => {
      y.value = translationY;
    })
    .onEnd(({ translationY }) => {
      if (translationY >= height * 0.2) {
        runOnJS(dismiss)();
      } else {
        y.value = withTiming(0);
      }
    })


  const rStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [
      { translateY: y.value },
      { scale: interpolate(y.value, [0, height], [1, 0.7])}
    ],
    borderRadius: interpolate(y.value, [0, height], [0, 50]),
    overflow: 'hidden'
  }))


  // useEffect(() => {
  //   if (seconds === 0) {
  //     listRef.current?.scrollTo({
  //       x: (selectedIndex + 1) * width,
  //     });
  //     updateSelectedID(undefined, selectedID + 1)
  //     setSeconds(10);
  //     return
  //   }
  //   let interval = setTimeout(() => {
  //     setSeconds(seconds => seconds - 1);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(interval);
  //   }
  // }, [seconds])

  const rStyle2 = (index: number) => useAnimatedStyle(() => {
    const offset = index * width;
    const inputRange = [offset - width, offset + width];
    const translateX = interpolate(x.value, inputRange, [width/2, -width/2], Extrapolate.CLAMP);
    const rotateY = interpolate(x.value, inputRange, [ANGLE, -ANGLE], Extrapolate.CLAMP);

    return {
      transform: [
        {perspective: PERSPECTIVE},
        { translateX },
        { rotateY: `${rotateY}rad`},
        { translateX },
      ]
    }
  })

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={rStyle}>
            {data.map((item, index) => (
              <Animated.View style={[rStyle2(index),StyleSheet.absoluteFill]} key={item.id}>
                <ActiveStorieImage {...item} />
              </Animated.View>
            ))}
            <AnimatedScrollView
              horizontal
              pagingEnabled
              ref={scrollViewRef}
              bounces={false}
              onLayout={scrollToRightUserStories}
              onScroll={({ nativeEvent }) => {
                x.value = nativeEvent.contentOffset.x;
              }}
              
              // onMomentumScrollEnd={({ nativeEvent: { contentOffset: { x }} }) => {
              //     updateSelectedID(x)
              // }}
              scrollEventThrottle={16}
              style={StyleSheet.absoluteFill}
              contentContainerStyle={{ width: width * data.length }}
              showsHorizontalScrollIndicator={false}
            />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollView: {
    flex: 1,
  }
})
