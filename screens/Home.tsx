import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import RecipeElement from "../components/RecipeElement";
import Title from "../components/Title";
import { useAppDispatch } from "../store";
import { logout } from "../store/auth/authReducer";
import { fetchUsers } from "../store/users/usersAction";
interface Recipe {
  entityId: string;
  ingredientsNames: string[];
  ingredientsQty: string[];
  ingredientsUnits: string[];
  title: string;
}
interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}
const Home: FC<HomeProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      <View>
        <Title>Przepisy:</Title>
        <Button onPress={async () => dispatch(logout())}>Wyloguj</Button>

        {/* <View style={styles.recipesWrapper}>
          {recipes &&
            recipes.map((recipe) => (
              <RecipeElement key={recipe.entityId} recipe={recipe} />
            ))}
        </View> */}
      </View>
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

export default Home;
