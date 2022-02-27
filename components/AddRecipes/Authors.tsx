import { Picker } from "@react-native-picker/picker";
import { FC, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Title from "../Title";

interface AuthorsProps {
  handleRecipeAuthor: (author: string) => void;
}
export interface User {
  name: "string";
  _id: "string";
}

const Authors: FC<AuthorsProps> = ({ handleRecipeAuthor }) => {
  const users: User[] = useSelector((state) => state.users.users);
  const [author, setAuthor] = useState<string>();

  return (
    <View>
      <Title>Autor przepisu</Title>
      <Picker
        selectedValue={author}
        onValueChange={(itemValue, itemIndex) => {
          setAuthor(itemValue);
          handleRecipeAuthor(itemValue);
        }}
        style={{ borderColor: "black" }}
      >
        {users.map((user) => (
          <Picker.Item key={user._id} label={user.name} value={user._id} />
        ))}
      </Picker>
    </View>
  );
};

export default Authors;
