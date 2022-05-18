import { addMinutes } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { defineTask, isTaskDefined,  } from 'expo-task-manager';


const TASK_NAME = 'add_counter';

export const TimerAnimation2 = () => {
  // const [seconds, setSeconds] = useState((addMinutes(new Date(), 1).getTime() - new Date().getTime()) / 1000);
  const [seconds, setSeconds] = useState(0);
  // const [granted, request] = usePermissions()


  const handleFormat = (value: number) => {
    const formatedMinutes = String(Math.floor(value / 60)).padStart(2, '0');
    const formatedSeconds = String(value % 60).padStart(2, '0');

    return `${formatedMinutes}:${formatedSeconds}`
  };


  useEffect(() => {
    (async () => {
      defineTask(TASK_NAME, ({ data, error, executionInfo }) => {
        console.log(data)
        console.log(error)
        console.log(executionInfo)
        console.log('algo foi')
        // let interval = setInterval((a) => {
        //   console.log(a)
        //   setSeconds(seconds => seconds + 1)
        // }, 1000);
        
        // return () => clearInterval(interval);
      })
    })()
  }, [])

  useEffect(() => {
    (async () => {
      console.log(await isTaskDefined(TASK_NAME))
    })()
  }, [])

  console.log(seconds)


  return (
    <View style={styles.container}>
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