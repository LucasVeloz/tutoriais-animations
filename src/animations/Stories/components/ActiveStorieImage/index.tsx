import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { ItemType } from '../../contexts';

const { height, width } = Dimensions.get('window');

export const ActiveStorieImage = ({ avatar_url, id }: ItemType) => {
  return (
    <SharedElement id={`image-${id}`}>
      <Image
        source={{ uri: avatar_url }}
        style={styles.container}
      />
    </SharedElement>
  ) 
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
  }
})