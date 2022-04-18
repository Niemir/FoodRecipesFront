import { NavigatorScreenParams } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import ListElement from "../components/ShoppingLists/ListElement";
import { useAppDispatch } from "../store";
interface ShoppingListInterface {}
const ShoppingList: FC = ({ navigation }) => {
  const days = useSelector((state) => state.recipes.shoppingList);
  const dispatch = useAppDispatch();
  const [shoppingLists, setShoppingLists] = useState([]);

  // useEffect(() => {
  //   console.log(recipes);
  //   const newRecipes = recipes.map((recipe) => {
  //     return { ...recipe, active: false };
  //   });
  //   setSingleDayRecipes(newRecipes);
  // }, [recipes]);

  // const getLists= shoppingLists.map((list)=><>)

  const rerenderList = () => {
    api
      .get("shoppinglist")
      .then((data) => setShoppingLists(data.data.withAuthors));
  };

  useEffect(() => {
    api
      .get("shoppinglist")
      .then((data) => setShoppingLists(data.data.withAuthors));
  }, []);

  useEffect(() => {
    // console.log(shoppingLists);
  }, [shoppingLists]);

  useEffect(() => {
    if (days) {
      // const allRecipes = [days["1"], days["2"], days["3"], days["4"]];
      // // const allRecipes = days?.map((day) => day[0]);
      // console.log(allRecipes);
    }
  }, [days]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      rerenderList();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.list}>
        {shoppingLists.map((list) => (
          <ListElement
            key={list.list._id}
            data={list}
            rerenderList={rerenderList}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 5,
  },
});
