import { FC, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Button,
  Platform,
} from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { useSelector } from "react-redux";
import { Background } from "victory-native";
import RecipeElement from "../../components/RecipeElement";
import { ADD_NEW, EDIT } from "../../helpers/screens";
import { useAppDispatch } from "../../store";
import { fetchRecipes } from "../../store/recipes/recipesAction";
import { Recipe } from "./AddRecipe";

const List: FC = ({ route, navigation }) => {
  const recipes: Recipe[] = useSelector((state) => state.recipes.entities);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // in future add loader for refetching list
      dispatch(fetchRecipes());
    });

    // console.log(recipes);
  }, [navigation]);

  const [isExtended, setIsExtended] = useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { ["right"]: 16 };
  return (
    <View style={styles.wrapper}>
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={recipes}
        keyExtractor={(item) => item?._id as string}
        renderItem={({ item, index }) => (
          <Pressable
            // key={item._id}
            // onPress={() => handleRecipePress(recipe.entityId)}
            onPress={() =>
              navigation.navigate(EDIT, {
                recipeId: item._id,
              })
            }>
            <RecipeElement recipe={item} />
          </Pressable>
        )}
      />

      <AnimatedFAB
        icon={"plus"}
        label={"Dodaj przepis"}
        extended={isExtended}
        onPress={() => navigation.navigate(ADD_NEW)}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle, fabStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});

export default List;
