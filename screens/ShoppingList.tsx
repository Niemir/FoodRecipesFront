import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Day/Header";
import RecipeElement from "../components/RecipeElement";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useAppDispatch } from "../store";
import { fetchRecipes } from "../store/recipes/recipesAction";
import recipesReducer from "../store/recipes/recipesReducer";
import { Recipe } from "./Recipes/AddRecipe";

const ShoppingList = () => {
  const days = useSelector((state) => state.recipes.shoppingList);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   console.log(recipes);
  //   const newRecipes = recipes.map((recipe) => {
  //     return { ...recipe, active: false };
  //   });
  //   setSingleDayRecipes(newRecipes);
  // }, [recipes]);

  useEffect(() => {
    if (days) {
      const allRecipes = [days["1"], days["2"], days["3"], days["4"]];
      // const allRecipes = days?.map((day) => day[0]);
      console.log(allRecipes);
    }
  }, [days]);

  return (
    <View>
      <ScrollView style={styles.recipesWrapper}>
        <Text>1</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    paddingTop: 0,
  },
  recipesWrapper: {
    padding: 20,
  },
});
export default ShoppingList;
