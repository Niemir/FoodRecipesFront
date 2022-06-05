import { FC, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { Background } from "victory-native";
import RecipeElement from "../../components/RecipeElement";
import { ADD_NEW, EDIT } from "../../helpers/screens";
import { useAppDispatch } from "../../store";
import { fetchRecipes } from "../../store/recipes/recipesAction";
import { Recipe } from "./AddRecipe";

const List: FC = ({ route, navigation }) => {
  const recipes: Recipe[] = useSelector((state) => state.recipes.entities);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // in future add loader for refetching list
      dispatch(fetchRecipes());
    });

    // console.log(recipes);
  }, [navigation]);
  return (
    <View style={styles.wrapper}>
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={recipes}
        keyExtractor={(item) => item?._id as string}
        renderItem={({ item, index }) => (
          <Pressable
            // key={item._id}
            // onPress={() => handleRecipePress(recipe.entityId)}
            onPress={() =>
              navigation.navigate(EDIT, {
                recipeId: item._id,
              })
            }
          >
            <RecipeElement recipe={item} />
          </Pressable>
        )}
      />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(ADD_NEW)}
      >
        <Text style={styles.buttonText}>Dodaj nowy przepis</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default List;
