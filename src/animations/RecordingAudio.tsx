import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const { usePermissions, Recording, Sound } = Audio;

export const RecordingAudio = () => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [status, requestPermissionAsync] = usePermissions();
  const [sound, setSound] = useState<Audio.Sound>();
  const [max, setMax] = useState(0);
  const [now, setNow]= useState(0);

  const startRecord = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    })
    const { recording } = await Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY, undefined, 100);
    setRecording(recording);
  }

  const stopRecord = async () => {
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    const status = await recording?.getStatusAsync();
    if (!uri || !status) return;
    await createAudio(uri);
    setMax(status?.durationMillis);
    setRecording(undefined);
  }

  const createAudio = async (uri: string) => {
    const { sound } = await Sound.createAsync({ uri }, undefined, (status) => {
      if (!status.isLoaded) return;
      setNow(status.positionMillis)
    });
    setSound(sound);
  }


  const playAudio = async () => {
    await sound?.playFromPositionAsync(now)
  }

  const pauseAudio = async () => {
    await sound?.pauseAsync()
  }

  useEffect(() => {
    (async () => {
      if (status?.granted) return;
      await requestPermissionAsync()
    })()
  }, [])



  return (
    <View style={styles.container}>
      <Button title={recording ? 'Parar' : 'Gravar'} onPress={recording ? stopRecord : startRecord} />
      {sound && (
        <>
          <Button title={'Tocar'} onPress={playAudio} />
          <Button title={'Parar'} onPress={pauseAudio} />
          <Button title={'Zerar'} onPress={() => setNow(0)} />
          <Slider maximumValue={max} value={now} style={{ width: '90%', margin: 20 }} onSlidingComplete={e => setNow(e)}  />
        </>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})