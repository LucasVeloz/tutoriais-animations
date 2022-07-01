import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { ItemType, useGlobalCTX } from '../../contexts';



export const UserStories = memo(({ avatar_url, id, login }: ItemType) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);
  const { updateSelectedID, selectedID} = useGlobalCTX();

  const handleClick = (selectedId: number) => {
    updateSelectedID(undefined, selectedId);
    setOpacity(0)
    navigation.navigate('Secondary', { id: selectedId });
  }


  useFocusEffect(useCallback(() => {
    let isFocused = true;
    if (!isFocused) return;
    setOpacity(1)

    return () => {
      isFocused = false;
    }
  }, []));


  return (
    <View style={styles.userContainer}>
      <TouchableOpacity  onPress={() => handleClick(id)}>
        <SharedElement id={`image-${id}`}>
          <Image source={{ uri: avatar_url }} style={[styles.image, { opacity }]} />
        </SharedElement>
      </TouchableOpacity>
      <Text ellipsizeMode='tail' numberOfLines={1} style={styles.text}>{login}</Text>
    </View>
  )
});

const styles = StyleSheet.create({
  userContainer: {
    width: 64,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    borderWidth: 2,
    borderColor: '#ff0066',
    marginBottom: 10,
    width: '100%',
    height: 64,
    borderRadius: 32,
  }
})
