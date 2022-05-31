import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Day/Header";
import RecipeElement from "../components/RecipeElement";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useAppDispatch } from "../store";
import { fetchRecipes } from "../store/recipes/recipesAction";
import recipesReducer, {
  addToDay,
  removeDay,
} from "../store/recipes/recipesReducer";
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
      recipe._id === id ? { ...recipe, active: !recipe.active } : recipe
    );
    setSingleDayRecipes(newRecipes);
  };

  const submitDay = (type: "add" | "remove") => {
    if (type === "add") {
      const activeRecipes = singleDayRecipes.filter(
        (recipe) => recipe.active === true
      );
      if (activeRecipes.length > 0) {
        dispatch(addToDay({ day: dayID, activeRecipes }));
      }
    } else {
      const newRecipes = singleDayRecipes.map((recipe) => ({
        ...recipe,
        active: false,
      }));
      setSingleDayRecipes(newRecipes);
      dispatch(removeDay({ day: dayID }));
    }
  };
  return (
    <View>
      <Header
        dayID={dayID}
        recipes={singleDayRecipes}
        submitDay={submitDay}
        addDayDisabled={isDisabled}
      />
      <ScrollView
        style={styles.recipesWrapper}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {singleDayRecipes &&
          singleDayRecipes.map((recipe) => (
            <Pressable
              key={recipe.entityId}
              onPress={() => handleRecipePress(recipe._id)}
            >
              <RecipeElement recipe={recipe} checkRecipe={handleRecipePress} />
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
