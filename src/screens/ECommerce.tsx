import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ECommerceData, getEcommerceData } from '../utils/ecommerce';




const Card = ({ background, image, name, value }: ECommerceData) =>  (
  <TouchableOpacity>
    <ImageBackground 
      source={{ uri: background }} 
      style={styles.background} 
      resizeMode='cover' 
      blurRadius={5}
    >
      <Image source={{ uri: image }} style={styles.roundImage} />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>
          {value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

export const ECommerce = () => {
  const [items, setItems] = useState<ECommerceData[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getEcommerceData()
      setItems(result);
    })()
  }, [])
  
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={items}
      renderItem={({ item }) => <Card {...item} />}
      contentContainerStyle={styles.container}
    />
  );
}



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  background: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  roundImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    zIndex: 100,
    position: 'absolute',
    top: 50,
  },
  content: { 
    width: '100%',
    height: '50%',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.6)',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 12,
    fontSize: 20,
  }
});