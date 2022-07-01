import { StyleSheet, Text, View } from "react-native"
import { CarrouselStories } from "../components/CarrouselStories"

export const Stories = () => {
  return (
    <View style={styles.container}>
      <CarrouselStories />
      <Text style={styles.text}>Tela dos stories</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  text: {
    textAlign: 'center',
  },
})