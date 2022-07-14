import { FC, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { inputs } from "../../styles";
import Title from "../Title";

export interface Macros {
  protein: number | string;
  carbohydrates: number | string;
  fat: number | string;
  calories: number | string;
}
interface MacroProps {
  handleRecipesMacros: (macros: Macros) => void;
  initialValue?: Macros;
}
const initialValues: Macros = {
  protein: "",
  carbohydrates: "",
  fat: "",
  calories: "",
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

const Macro: FC<MacroProps> = ({ handleRecipesMacros, initialValue }) => {
  const [macros, setMacros] = useState<Macros>(
    initialValue ? initialValue : initialValues
  );
  const showMacros = Object.entries(macros)
    .sort()
    .map(([key, val]) => (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          width: "50%",
        }}
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
      <View
        style={{ marginBottom: 10, flexDirection: "row", flexWrap: "wrap" }}
      >
        {showMacros}
      </View>
    </View>
  );
};

export default Macro;
