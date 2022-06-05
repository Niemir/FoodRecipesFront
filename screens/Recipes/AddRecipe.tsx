import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "victory-native";
import Authors from "../../components/AddRecipes/Authors";
import Form from "../../components/AddRecipes/Form";

import Ingredients, {
  Ingredient,
} from "../../components/AddRecipes/Ingredients";
import Macro, { Macros } from "../../components/AddRecipes/Macro";
import Snackbar from "../../components/Modal";
import Submit from "../../components/Submit";
import Title from "../../components/Title";

import { inputs } from "../../styles";

export interface Recipe {
  _id?: string;
  entityId?: string;
  name: string;
  ingredients: Ingredient[];
  protein: number;
  carbohydrates: number;
  fat: number;
  calories: number;
  active: boolean;
}

const initialRecipe = {
  name: "",
  ingredients: [],
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  calories: 0,
  active: false,
};
const AddRecipe = () => {
  const [recipeValues, setRecipesValues] = useState<Recipe>(initialRecipe);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { token } = useSelector((state) => state.auth.user);

  const handleSubmit = async () => {
    if (recipeValues.name === "") {
      return;
    }
    setLoading(true);

    const res = await fetch("http://192.168.1.135:5000/recipes/add", {
      body: JSON.stringify({ ...recipeValues, token }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => (data.errors ? setStatus("error") : setStatus("success")))
      .catch(() => setStatus("error"))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={styles.wrapper}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {status === "success" ? (
        <View>
          <Text>Przepis dodany</Text>
        </View>
      ) : (
        <>
          <Form
            recipeValues={recipeValues}
            setRecipesValues={setRecipesValues}
          />
          <Submit
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            status={status}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    paddingBottom: 100,
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
  },
});

export default AddRecipe;
