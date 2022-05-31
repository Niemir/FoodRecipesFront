import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { editSingleRecipe, getSingleRecipe } from "../../api/api";
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
import { Recipe } from "./AddRecipe";

let initialRecipe = {
  name: "",
  ingredients: [],
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  calories: 0,
  active: false,
  author: "",
};

const Edit = ({ route, navigation }) => {
  const [recipeValues, setRecipesValues] = useState<Recipe | null>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { token } = useSelector((state) => state.auth.user);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await editSingleRecipe(recipeValues, token)
      .then((response) => response.json())
      .then((data) => (data.errors ? setStatus("error") : setStatus("success")))
      .catch(() => setStatus("error"))
      .finally(() => setLoading(false));
  };

  const getInitialValues = async () => {
    const data = await getSingleRecipe(route.params.recipeId, token);

    setRecipesValues({ ...recipeValues, ...data });
    return data;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      getInitialValues();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (!recipeValues) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Form recipeValues={recipeValues} setRecipesValues={setRecipesValues} />
      <Submit
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        status={status}
        label="Zapisz"
      />
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

export default Edit;
