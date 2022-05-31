import { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";

const SplashScreen: FC = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>Ładowanie apki...</Text>
        {/* <View style={styles.recipesWrapper}>
          {recipes &&
            recipes.map((recipe) => (
              <RecipeElement key={recipe.entityId} recipe={recipe} />
            ))}
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    color: "#ddd",
  },
});

export default SplashScreen;
