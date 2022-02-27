import { FC } from "react";
import { View, Text } from "react-native";
import { Recipe } from "../../screens/Recipes/AddRecipe";
interface HeaderProps {
  recipes: Recipe[];
}
const Header: FC<HeaderProps> = ({ recipes }) => {
  //   if(recipes.length)
  const activeRecipes = recipes.filter((recipe) => recipe.active);
  const activeRecipesLength = activeRecipes.length;

  const caloriesSum =
    activeRecipesLength > 0 &&
    activeRecipes
      .map((recipe) => recipe.calories)
      .reduce((acc, curr) => Number(acc) + Number(curr));

  return (
    <View
      style={{
        height: 70,
        backgroundColor: "#bbb",
        // alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black" }}>Posiłki {activeRecipesLength} / 4</Text>
      <Text>Kalorie: {caloriesSum}</Text>
    </View>
  );
};

export default Header;
