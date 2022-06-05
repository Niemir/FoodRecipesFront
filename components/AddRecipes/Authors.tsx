import { Picker } from "@react-native-picker/picker";
import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Title from "../Title";

interface AuthorsProps {
  handleRecipeAuthor: (author: string) => void;
  initialValue?: string;
}
export interface User {
  name: string;
  _id: string;
  email: string;
  connections: string[];
}

const Authors: FC<AuthorsProps> = ({ handleRecipeAuthor, initialValue }) => {
  const users: User[] = useSelector((state) => state.users.users);
  const [author, setAuthor] = useState<string>(
    initialValue ? initialValue : ""
  );

  return (
    <View>
      <Title>Autor</Title>
      <Picker
        selectedValue={author}
        onValueChange={(itemValue, itemIndex) => {
          setAuthor(itemValue);
          handleRecipeAuthor(itemValue);
        }}
        style={{ borderColor: "black" }}
      >
        <Picker.Item label="Wybierz" value="" />
        {users.map((user) => (
          <Picker.Item key={user._id} label={user.name} value={user._id} />
        ))}
      </Picker>
    </View>
  );
};

export default Authors;
