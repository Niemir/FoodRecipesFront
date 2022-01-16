import { FC, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { inputs } from "../../styles";
import Title from "../Title";

export interface Macros {
  protein: number;
  carbohydrates: number;
  fat: number;
  calories: number;
}
interface MacroProps {
  handleRecipesMacros: (macros: Macros) => void;
}
const initialValues: Macros = {
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  calories: 0,
};
const handleTranslate = (label: string): string => {
  switch (label) {
    case "protein":
      return "Białko";
    case "carbohydrates":
      return "Węglowodany";
    case "fat":
      return "Tłuszcz";
    case "calories":
      return "Kalorie";
    default:
      return "";
  }
};

const Macro: FC<MacroProps> = ({ handleRecipesMacros }) => {
  const [macros, setMacros] = useState<Macros>(initialValues);

  const showMacros = Object.entries(macros)
    .sort()
    .map(([key, val]) => (
      <View
        style={{ flexDirection: "row", height: 40, alignItems: "center" }}
        key={key}
      >
        <Text>{handleTranslate(key)}</Text>
        <TextInput
          onChangeText={(e) => setMacros({ ...macros, [key]: e })}
          onEndEditing={(e) =>
            setMacros({ ...macros, [key]: e.nativeEvent.text })
          }
          value={`${val}`}
          style={{ borderBottomWidth: 1, marginLeft: 10, textAlign: "center" }}
          placeholder="0"
          keyboardType="number-pad"
        />
      </View>
    ));

  useEffect(() => {
    if (macros) {
      handleRecipesMacros(macros);
    }
  }, [macros]);
  return (
    <View>
      <Title>Makrosładniki</Title>
      <View style={{ marginBottom: 10 }}>{showMacros}</View>
    </View>
  );
};

export default Macro;
