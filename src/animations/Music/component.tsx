import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {  Audio } from 'expo-av'
import playlist from './playlist';
import { FontAwesome5 } from '@expo/vector-icons';
import { format } from 'date-fns';

const { width } = Dimensions.get('window');
const SIZE = width * 0.8;


export const Music = () => {
  const listRef = useRef<FlatList>(null);
  const [music, setMusic] = useState<Audio.SoundObject | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [max, setMax] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const { artist, image, name } = playlist[currentSongIndex];

  const musicResume = async () => {
    setIsPlaying(o => !o);
    if (isPlaying) {
      await music?.sound.pauseAsync();
    } else {
      await music?.sound.playAsync();
    }
  }

  const backward = async () => {
    if (progress > 0) {
      await music?.sound.setPositionAsync(0);
      setProgress(0);
    } else if (currentSongIndex > 0) {
      listRef.current?.scrollToIndex({ index: currentSongIndex - 1, animated: false });
    }
  }

  const forward = () => {
    if (currentSongIndex < playlist.length - 1) {
      listRef.current?.scrollToIndex({ index: currentSongIndex + 1, animated: false });
    }
  }

  useEffect(() => {
    (async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      })
    })()
  }, [])

  useEffect(() => {
    (async () => {
      await music?.sound.unloadAsync();
      const audio = await Audio.Sound.createAsync(
        playlist[currentSongIndex].music,
        {
          progressUpdateIntervalMillis: 1000,
          shouldPlay: isPlaying,
          volume: 1,
        },
        (status) => {
          if (status.positionMillis && status.durationMillis) {
            setProgress(status.positionMillis)
            setMax(status.durationMillis)
          }
        }
      );
      setMusic(audio);
    })()
  }, [currentSongIndex])

  return (
    <ImageBackground
      source={{
        uri: image,
        cache: 'force-cache'
      }}
      blurRadius={100}
      style={styles.container}
    >
      <FlatList
        data={playlist}
        ref={listRef}
        keyExtractor={item => item.id.toString()}
        onScroll={async ({ nativeEvent }) => {
          const index = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
          if (index !== currentSongIndex) {
            setProgress(0);
            setCurrentSongIndex(index);
          }
        }}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.currentSongContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.listContainer}
        contentContainerStyle={styles.listContainer}

      />
      <View style={styles.controls}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.artist}>{artist}</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.text}>{format(progress, 'mm:ss')}</Text>
          <Slider
            style={styles.slider}
            minimumTrackTintColor="cyan"
            minimumValue={0}
            maximumValue={max}
            value={progress}
            onSlidingStart={async () => {
              await music?.sound.pauseAsync();
            }}
            onSlidingComplete={async (value) => {
              await music?.sound.setPositionAsync(value);
              await music?.sound.playAsync();
            }}
          />
        <Text style={styles.text}>{format(max, 'mm:ss')}</Text>
        </View>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={backward}>
          <FontAwesome5 name="step-backward" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={musicResume}>
          <FontAwesome5 name={isPlaying ? "pause" : "play"} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={forward}>
          <FontAwesome5 name="step-forward" size={24} color="white" />
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  listContainer: {
    flexGrow: 0
  },
  currentSongContainer: {
    width,
    alignItems: 'center',
  },
  image: {
    height: SIZE,
    width: SIZE,
    borderRadius: 10,
  },
  controls: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  artist: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    marginTop: 24,
  }
});
