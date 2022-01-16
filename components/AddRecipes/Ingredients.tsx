import { Picker } from "@react-native-picker/picker";
import { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { inputs } from "../../styles";
import Title from "../Title";

export interface Ingredient {
  name: string;
  qty: string;
  unit: "szt" | "g" | "ml";
}
interface IngredientsProps {
  handleRecipeValues: (ingredients: Ingredient[]) => void;
}
const initialIngredient = {
  name: "",
  qty: "",
  unit: "g",
};
const Ingredients: FC<IngredientsProps> = ({ handleRecipeValues }) => {
  const [unit, setUnit] = useState<"szt" | "g" | "ml">("g");
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [currentIngredient, setCurrentIngredient] =
    useState<Ingredient>(initialIngredient);

  const removeIngredient = (name: string) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient.name !== name
    );
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    if (
      currentIngredient.name.length > 0 &&
      !ingredients.some(
        (ingredient) => ingredient.name === currentIngredient.name
      )
    ) {
      setIngredients([...ingredients, currentIngredient]);
    }
  };

  useEffect(() => {
    if (ingredients) {
      handleRecipeValues(ingredients);
    }
  }, [ingredients]);
  return (
    <View>
      <Title>Składniki</Title>

      {ingredients.map((ingredient, id) => (
        <View
          key={ingredient.name + id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>
            {ingredient.name} - {ingredient.qty} {ingredient.unit}
          </Text>
          <Pressable onPress={() => removeIngredient(ingredient.name)}>
            <Text>Usuń</Text>
          </Pressable>
        </View>
      ))}

      <View style={style.inputRow}>
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
          style={inputs.primary}
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
          style={{ ...inputs.primary, ...inputs.rounded }}
          placeholder="0"
          keyboardType="number-pad"
        />
        <Picker
          selectedValue={unit}
          onValueChange={(itemValue: "szt" | "g" | "ml", itemIndex) => {
            setUnit(itemValue);
            setCurrentIngredient({ ...currentIngredient, unit: itemValue });
          }}
          style={{ width: 90, borderColor: "black" }}
        >
          <Picker.Item label="g" value="g" />
          <Picker.Item label="ml" value="ml" />
          <Picker.Item label="szt" value="szt" />
        </Picker>
        <Pressable style={style.add} onPress={addIngredient}>
          <Text style={style.addText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  add: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "flex-end",
    marginLeft: 15,
    marginBottom: 5,
  },
  addText: {
    textAlign: "center",
    fontSize: 26,
    textAlignVertical: "center",
    color: "black",
  },
});
export default Ingredients;