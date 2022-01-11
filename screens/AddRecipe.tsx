import { Formik } from "formik";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addRecipe } from "../store/recipes/recipesSlice";

interface Ingredient {
  id: string;
  name: string;
  qty: string;
}
interface Recipe {
  title: string;
  ingredients: Array<Ingredient>;
}
const initialIngredient = {
  id: "",
  name: "",
  qty: "",
};
const initialRecipe = {
  title: "",
  ingredients: [],
};
const AddRecipe = () => {
  const [recipeValues, setRecipesValues] = useState<Recipe>(initialRecipe);
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [currentIngredient, setCurrentIngredient] =
    useState<Ingredient>(initialIngredient);
  const count = useSelector((state: RootState) => state.recipes.recipes);
  const dispatch = useDispatch();
  const removeIngredient = (name: string) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient.name !== name
    );
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    if (
      !ingredients.some(
        (ingredient) => ingredient.name === currentIngredient.name
      )
    ) {
      setIngredients([...ingredients, currentIngredient]);
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <Text>Nazwa przepisu</Text>
        <TextInput
          onChangeText={(e) => setRecipesValues({ ...recipeValues, title: e })}
          onEndEditing={(e) =>
            setRecipesValues({ ...recipeValues, title: e.nativeEvent.text })
          }
          value={recipeValues.title}
          style={styles.input}
          placeholder="Np. Tosty z serem"
        />
      </View>
      <Text style={styles.title}>Składniki</Text>

      {ingredients.map((ingredient, id) => (
        <View
          key={ingredient.name + id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>
            {ingredient.name} {ingredient.qty}
          </Text>
          <Pressable onPress={() => removeIngredient(ingredient.name)}>
            <Text>Usuń</Text>
          </Pressable>
        </View>
      ))}

      <View style={styles.inputRow}>
        <TextInput
          onChangeText={(e) =>
            setCurrentIngredient({ ...currentIngredient, name: e })
          }
          onEndEditing={(e) =>
            setCurrentIngredient({
              ...currentIngredient,
              name: e.nativeEvent.text,
            })
          }
          value={currentIngredient.name}
          style={styles.input}
          placeholder="Nazwa składnika"
        />
        <Text style={{ margin: 5 }}>Ilość:</Text>
        <TextInput
          onChangeText={(e) =>
            setCurrentIngredient({ ...currentIngredient, qty: e })
          }
          onEndEditing={(e) =>
            setCurrentIngredient({
              ...currentIngredient,
              qty: e.nativeEvent.text,
            })
          }
          value={currentIngredient.qty}
          style={{ ...styles.input, ...styles.inputCount }}
          placeholder="0"
        />
        <Pressable style={styles.add} onPress={addIngredient}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>

      <View>
        <Pressable style={styles.submit}>
          <Text style={styles.submitText}>Zatwierdź</Text>
        </Pressable>
      </View>
    </View>
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#aaa",
    padding: 10,
    flex: 1,
  },
  inputCount: {
    flex: 0,
    width: 50,
  },
  add: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "flex-end",
    marginLeft: 15,
  },
  addText: {
    textAlign: "center",
    fontSize: 26,
    textAlignVertical: "center",
    color: "black",
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  submitText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default AddRecipe;
