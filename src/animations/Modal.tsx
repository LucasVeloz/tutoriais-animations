import React, { useState } from "react";
import { Button, StyleSheet, View, Modal as ModalComponent, TouchableOpacity } from "react-native";

export const Modal = () => {
  const [isVisible, setIsVisible] = useState(false);
  

  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Abrir modal" onPress={openModal} />
      <ModalComponent visible={isVisible} animationType="slide">
        <View style={[styles.container, styles.modalContainer]}>
          <TouchableOpacity style={styles.button} onPress={closeModal} />
        </View>
      </ModalComponent>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#ff0066',
  }
})