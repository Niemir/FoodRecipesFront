import React, { FC } from "react";
import { TextInput, View } from "react-native";
import { Recipe } from "../../screens/Recipes/AddRecipe";
import { inputs } from "../../styles";
import Title from "../Title";
import Authors from "./Authors";
import Ingredients, { Ingredient } from "./Ingredients";
import Macro, { Macros } from "./Macro";

interface FormProps {
  recipeValues: Recipe;
  setRecipesValues: (recipe: Recipe) => void;
}

const Form: FC<FormProps> = ({ recipeValues, setRecipesValues }) => {
  const handleRecipesIngredients = (ingredients: Ingredient[]) => {
    if (recipeValues) {
      const recipeWithIngredients = {
        ...recipeValues,
        ingredients,
      };

      setRecipesValues(recipeWithIngredients);
    }
  };

  const handleRecipesMacros = (macros: Macros) => {
    if (recipeValues) {
      const toNumberMacros = Object.entries(macros).map(([key, value]) => ({
        [key]: Number(value),
      }));
      toNumberMacros.forEach((number) => {
        macros = { ...macros, ...number };
      });
      setRecipesValues({ ...recipeValues, ...macros });
    }
  };

  return (
    <>
      <Title>Nazwa przepisu</Title>

      {recipeValues && (
        <TextInput
          onChangeText={(e) => setRecipesValues({ ...recipeValues, name: e })}
          onEndEditing={(e) =>
            setRecipesValues({ ...recipeValues, name: e.nativeEvent.text })
          }
          value={recipeValues.name}
          style={inputs.primary}
          placeholder="Np. Tosty z serem"
        />
      )}

      <Ingredients
        handleRecipeValues={handleRecipesIngredients}
        initialValue={recipeValues.ingredients}
      />
      <Macro
        handleRecipesMacros={handleRecipesMacros}
        initialValue={{
          protein: recipeValues.protein,
          carbohydrates: recipeValues.carbohydrates,
          fat: recipeValues.fat,
          calories: recipeValues.calories,
        }}
      />
    </>
  );
};

export default Form;
