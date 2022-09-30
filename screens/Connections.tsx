import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List, Button, Portal, Dialog, Paragraph } from "react-native-paper";
import { useSelector } from "react-redux";
import { addConnection, removeConnection } from "../api/api";
import { User } from "../components/AddRecipes/Authors";
import RecipeElement from "../components/RecipeElement";
import Title from "../components/Title";
import { useAppDispatch } from "../store";
import { updateUser } from "../store/auth/authReducer";
import { fetchUsers } from "../store/users/usersAction";
interface Recipe {
  entityId: string;
  ingredientsNames: string[];
  ingredientsQty: string[];
  ingredientsUnits: string[];
  title: string;
}
interface ConnectionsProps {
  navigation: NavigationProp<ParamListBase>;
}
const Connections: FC<ConnectionsProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const users: User[] = useSelector((state) => state.users.users);
  const user: User = useSelector((state) => state.auth.user);
  const { token } = useSelector((state) => state.auth.user);
  const [refresh, setRefresh] = useState(0);

  console.log(users);
  //   TODO:sometimes there is an error while loading screen
  if (!users) {
    return (
      <View>
        <Text>Brak użytkowników</Text>
      </View>
    );
  }

  const showUsers = users
    .filter((c) => c._id !== user._id)
    .map((singleUser) => (
      <List.Item
        key={singleUser._id}
        title={singleUser.name}
        right={() => (
          <Button
            mode="contained"
            onPress={async () => {
              console.log(token);
              // dodać tutaj dodawanie user i ogarnac calosc na backendzie odnosnie polaczen
              try {
                // await addConnection(singleUser._id, token);
                // await removeConnection(singleUser._id, token)
                //   .then((data) => console.log(data))
                //   .catch((err) => console.log(err));
                if (
                  users
                    .find((el) => el._id === user._id)
                    .connections.some((friend) => friend === singleUser._id)
                ) {
                  await removeConnection(singleUser._id, token);
                } else {
                  await addConnection(singleUser._id, token);
                }
                // dispatch(updateUser(user ? JSON.parse(user) : null));
                setRefresh(refresh + 1);
              } catch (error) {
                console.log(error);
              }
            }}>
            {users
              .find((el) => el._id === user._id)
              .connections.some((friend) => friend === singleUser._id) ? (
              <Text>Usuń</Text>
            ) : (
              <Text> Dodaj </Text>
            )}
          </Button>
        )}
        style={{ borderBottomColor: "#e6e6e6", borderBottomWidth: 1 }}
      />
    ));

  useEffect(() => {
    // if (users.length === 0) {
    // }
    dispatch(fetchUsers());
  }, [refresh]);

  return (
    <View style={styles.wrapper}>
      <List.Section>{showUsers}</List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    paddingTop: 0,
  },
  recipesWrapper: {},
});

export default Connections;
