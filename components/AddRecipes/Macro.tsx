import { Text, TextInput, View } from "react-native";
import Title from "../Title";

const Macro = () => {
  return (
    <View>
      <Title>Makrosładniki</Title>
      <View style={{ flexDirection: "row" }}>
        <Text>Białko</Text>
        <TextInput
          onChangeText={console.log("object")}
          onEndEditing={console.log("object")}
          value={"test"}
          style={{}}
          placeholder="0"
        />
      </View>
    </View>
  );
};

export default Macro;
