import { Picker } from "@react-native-picker/picker";
import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { Card } from "react-native-paper";
import { getIngredients } from "../../api/api";
import useDebounce from "../../hooks/useDebounce";
import { inputs } from "../../styles";
import AddRoundedButton from "../AddRoundedButton";
import Title from "../Title";

type Units = "szt" | "g" | "ml";
export interface Ingredient {
  id: string;
  name: string;
  qty: number;
  unit: Units;
}
interface IngredientsProps {
  handleRecipeValues: (ingredients: Ingredient[]) => void;
  initialValue?: Ingredient[];
}
const initialIngredient = {
  id: "",
  name: "",
  qty: 0,
  unit: "g" as const,
};
const Ingredients: FC<IngredientsProps> = ({
  handleRecipeValues,
  initialValue,
}) => {
  const [unit, setUnit] = useState<Units>("g");
  const [ingredients, setIngredients] = useState<Array<Ingredient>>(
    initialValue ? initialValue : []
  );
  const [currentIngredient, setCurrentIngredient] =
    useState<Ingredient>(initialIngredient);
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const debouncedValue = useDebounce<Ingredient>(currentIngredient, 500);
  const [preparedIngredients, setPreparedIngredients] = useState<Ingredient[]>(
    []
  );

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
    const getPreparedIngredients = async () => {
      try {
        const result = await getIngredients(debouncedValue.name);
        setPreparedIngredients(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPreparedIngredients();
  }, [debouncedValue]);

  useEffect(() => {
    if (ingredients) {
      handleRecipeValues(ingredients);
    }
  }, [ingredients]);
  return (
    <View>
      <Title>Sk??adniki</Title>
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
            <Text>Usu??</Text>
          </Pressable>
        </View>
      ))}
      {/* przebudowa?? sk??adniki, tak, ??eby wybiera?? z list sk??adnik, dodawa?? go jako
      object, wyciaga?? id i tak wrzuca?? do przepisu */}
      <View style={style.inputRow}>
        <TextInput
          onFocus={() => setPickerVisibility(true)}
          onChangeText={(e) =>
            setCurrentIngredient({ ...currentIngredient, name: e })
          }
          onEndEditing={(e) => {
            setCurrentIngredient({
              ...currentIngredient,
              name: e.nativeEvent.text,
            });
          }}
          value={currentIngredient.name}
          style={inputs.primary}
          placeholder="Nazwa sk??adnika"
        />
        {isPickerVisible && (
          <FlatList
            data={preparedIngredients}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={style.resultItem}
                  onPress={() => {
                    setCurrentIngredient({
                      ...currentIngredient,
                      name: item.name,
                      id: item._id,
                    });
                    setPickerVisibility(false);
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            nestedScrollEnabled={true}
            keyExtractor={(item) => item.name}
            style={style.searchResultsContainer}
          />
        )}
        <TextInput
          onChangeText={(e) =>
            setCurrentIngredient({ ...currentIngredient, qty: parseInt(e) })
          }
          onEndEditing={(e) =>
            setCurrentIngredient({
              ...currentIngredient,
              qty: parseInt(e.nativeEvent.text),
            })
          }
          value={currentIngredient.qty}
          style={{ ...inputs.primary, ...inputs.rounded, marginHorizontal: 3 }}
          placeholder="100"
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

        <AddRoundedButton handlePress={addIngredient} />
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
    marginLeft: 0,
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
  searchResultsContainer: {
    width: 340,
    maxHeight: 230,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
    left: 5,
    zIndex: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 3,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
});
export default Ingredients;
