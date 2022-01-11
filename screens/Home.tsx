import { Button, Text, View } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screedn</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Add Recipe")}
      />
    </View>
  );
};

export default Home;
