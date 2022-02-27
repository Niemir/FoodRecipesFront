import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import Authors from "../components/AddRecipes/Authors";

import Ingredients, { Ingredient } from "../components/AddRecipes/Ingredients";
import Macro, { Macros } from "../components/AddRecipes/Macro";
import Snackbar from "../components/Modal";
import Submit from "../components/Submit";
import Title from "../components/Title";

import { inputs } from "../styles";

export interface Recipe {
  entityId?: string;
  name: string;
  ingredients: Ingredient[];
  protein: number;
  carbohydrates: number;
  fat: number;
  calories: number;
  active: boolean;
  author: string;
}

const initialRecipe = {
  name: "",
  ingredients: [],
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  calories: 0,
  active: false,
  author: "",
};
const AddRecipe = () => {
  const [recipeValues, setRecipesValues] = useState<Recipe>(initialRecipe);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
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

  const handleRecipeAuthor = (author: string) => {
    setRecipesValues({ ...recipeValues, author: author });
  };

  const handleSubmit = async () => {
    if (recipeValues.name === "") {
      // console.log("ch");
      // setLoading(false);
      return;
    }
    setLoading(true);

    const res = await fetch("http://192.168.1.135:5000/recipes/add", {
      body: JSON.stringify(recipeValues),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => (data.errors ? setStatus("error") : setStatus("success")))
      .catch(() => setStatus("error"));
    // .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={styles.wrapper}>
      <Title>Nazwa przepisu</Title>

      <TextInput
        onChangeText={(e) => setRecipesValues({ ...recipeValues, name: e })}
        onEndEditing={(e) =>
          setRecipesValues({ ...recipeValues, name: e.nativeEvent.text })
        }
        value={recipeValues.name}
        style={inputs.primary}
        placeholder="Np. Tosty z serem"
      />

      <Ingredients handleRecipeValues={handleRecipesIngredients} />
      <Macro handleRecipesMacros={handleRecipesMacros} />
      <Authors handleRecipeAuthor={handleRecipeAuthor} />
      <Submit
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        status={status}
      />
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
