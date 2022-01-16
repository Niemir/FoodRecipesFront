import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import Ingredients, { Ingredient } from "../components/AddRecipes/Ingredients";
import Macro, { Macros } from "../components/AddRecipes/Macro";
import Submit from "../components/Submit";
import Title from "../components/Title";

import { inputs } from "../styles";

interface Recipe {
  title: string;
  ingredientsNames: string[];
  ingredientsQty: string[];
  ingredientsUnits: string[];
  protein: number;
  carbohydrates: number;
  fat: number;
  calories: number;
}

const initialRecipe = {
  title: "",
  ingredientsNames: [],
  ingredientsQty: [],
  ingredientsUnits: [],
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  calories: 0,
};
const AddRecipe = () => {
  const [recipeValues, setRecipesValues] = useState<Recipe>(initialRecipe);

  const handleRecipesIngredients = (ingredients: Ingredient[]) => {
    const ingredientsNames: string[] = [];
    const ingredientsQty: string[] = [];
    const ingredientsUnits: string[] = [];
    ingredients.forEach((ingredient) => {
      ingredientsNames.push(ingredient.name);
      ingredientsQty.push(ingredient.qty);
      ingredientsUnits.push(ingredient.unit);
    });

    const recipeWithIngredients = {
      ...recipeValues,
      ingredientsNames,
      ingredientsQty,
      ingredientsUnits,
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
    console.log(recipeValues);
  }, [recipeValues]);

  const handleSubmit = async () => {
    const res = await fetch("http://192.168.1.135:5000/api", {
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
