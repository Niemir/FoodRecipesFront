import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import Ingredients, { Ingredient } from "../components/AddRecipes/Ingredients";
import Macro, { Macros } from "../components/AddRecipes/Macro";
import Submit from "../components/Submit";
import Title from "../components/Title";

import { inputs } from "../styles";

export interface Recipe {
  entityId?: string;
  title: string;
  ingredients: Ingredient[];
  protein: number;
  carbohydrates: number;
  fat: number;
  calories: number;
  active: boolean;
}

const initialRecipe = {
  title: "",
  ingredients: [],
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  calories: 0,
  active: false,
};
const AddRecipe = () => {
  const [recipeValues, setRecipesValues] = useState<Recipe>(initialRecipe);

  const handleRecipesIngredients = (ingredients: Ingredient[]) => {
    const recipeWithIngredients = {
      ...recipeValues,
      ingredients,
    };

    setRecipesValues(recipeWithIngredients);
  };

  const handleRecipesMacros = (macros: Macros) => {
    const toNumberMacros = Object.entries(macros).map(([key, value]) => ({
      [key]: Number(value),
    }));
    toNumberMacros.forEach((number) => {
      macros = { ...macros, ...number };
    });

    setRecipesValues({ ...recipeValues, ...macros });
  };

  useEffect(() => {
    // console.log(recipeValues);
  }, [recipeValues]);

  const handleSubmit = async () => {
    // console.log(recipeValues);
    const res = await fetch("http://192.168.1.135:5000/recipes/add", {
      body: JSON.stringify(recipeValues),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <ScrollView style={styles.wrapper}>
      <Title>Nazwa przepisu</Title>

      <TextInput
        onChangeText={(e) => setRecipesValues({ ...recipeValues, title: e })}
        onEndEditing={(e) =>
          setRecipesValues({ ...recipeValues, title: e.nativeEvent.text })
        }
        value={recipeValues.title}
        style={inputs.primary}
        placeholder="Np. Tosty z serem"
      />

      <Ingredients handleRecipeValues={handleRecipesIngredients} />
      <Macro handleRecipesMacros={handleRecipesMacros} />
      <Submit handleSubmit={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
  },
});

export default AddRecipe;
