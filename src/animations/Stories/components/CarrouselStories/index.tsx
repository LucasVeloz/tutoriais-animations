import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useGlobalCTX } from "../../contexts";
import { UserStories } from "../UserStories";


export const CarrouselStories = () => {
  const { data } = useGlobalCTX();
  return (
    <FlatList
      keyExtractor={item => String(item.id)}
      data={data} 
      renderItem={({ item }) => <UserStories {...item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carrousel}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    marginHorizontal: 5,
  },
  carrousel: {
    padding: 20
  },
})
