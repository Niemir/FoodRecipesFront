import { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Day/Header";
import RecipeElement from "../components/RecipeElement";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useAppDispatch } from "../store";
import { fetchRecipes } from "../store/recipes/recipesAction";
import recipesReducer, { addToDay } from "../store/recipes/recipesReducer";
import { Recipe } from "./Recipes/AddRecipe";

const Day = ({ route }) => {
  const recipes: Recipe[] = useSelector((state) => state.recipes.entities);
  const list: Recipe[] = useSelector((state) => state.recipes.shoppingList);
  const [singleDayRecipes, setSingleDayRecipes] = useState<Recipe[]>([]);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const dayID = route.params.dayID;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newRecipes = recipes.map((recipe) => {
      return { ...recipe, active: false };
    });
    setSingleDayRecipes(newRecipes);
  }, [recipes]);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, []);

  useEffect(() => {
    setDisabled(!singleDayRecipes.some((recipe) => recipe.active));
  }, [singleDayRecipes]);

  useEffect(() => {
    // console.log(list);
  }, [list]);

  const handleRecipePress = (id: string) => {
    const newRecipes = singleDayRecipes.map((recipe) =>
      recipe.entityId === id ? { ...recipe, active: !recipe.active } : recipe
    );
    setSingleDayRecipes(newRecipes);
  };

  const submitDay = () => {
    const activeRecipes = singleDayRecipes.filter(
      (recipe) => recipe.active === true
    );
    if (activeRecipes.length > 0) {
      dispatch(addToDay({ day: dayID, activeRecipes }));
    } else {
    }
  };
  return (
    <View>
      <Header recipes={singleDayRecipes} />
      <ScrollView
        style={styles.recipesWrapper}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Button
          onPress={submitDay}
          title="Zatwierdź dzień"
          disabled={isDisabled}
        />
        {singleDayRecipes &&
          singleDayRecipes.map((recipe) => (
            <Pressable
              key={recipe.entityId}
              onPress={() => handleRecipePress(recipe.entityId)}
            >
              <RecipeElement recipe={recipe} />
            </Pressable>
          ))}
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
export default Day;
