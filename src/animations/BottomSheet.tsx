import React, { useRef } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

export const BottomSheet = () => {
  const modalRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();

  const handleModal = () => {
    modalRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <Text onPress={handleModal}>abrir modal</Text>
      <Modalize ref={modalRef} adjustToContentHeight>
        <View style={{ height: height/4 }} />
      </Modalize>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})