import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import RecipeElement from "../components/RecipeElement";
import Title from "../components/Title";
interface Recipe {
  entityId: string;
  ingredientsNames: string[];
  ingredientsQty: string[];
  ingredientsUnits: string[];
  title: string;
}

const Home = ({ navigation }) => {
  // const [recipes, setRecipes] = useState<Recipe[]>([]);

  // useEffect(() => {
  //   if (recipes.length === 0) {
  //     fetch("http://192.168.1.135:5000/getRecipes")
  //       .then((response) => response.json())
  //       .then((data) => setRecipes(data));
  //   }
  // }, []);

  return (
    <View style={styles.wrapper}>
      <View>
        <Title>Przepisy:</Title>
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
    padding: 20,
    paddingTop: 0,
  },
  recipesWrapper: {},
});

export default Home;
