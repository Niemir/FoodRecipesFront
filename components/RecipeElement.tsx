import { FC } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import { Recipe } from "../screens/Recipes/AddRecipe";
import AddRoundedButton from "./AddRoundedButton";

interface RecipeElementProps {
  recipe: Recipe;
  checkRecipe: (id: string) => void;
}

const RecipeElement: FC<RecipeElementProps> = ({ recipe, checkRecipe }) => {
  const {
    entityId,
    name,
    ingredients,
    calories,
    fat,
    protein,
    carbohydrates,
    active,
  } = recipe;

  const data = [
    {
      x: 1,
      value: protein * 4,
      label: "B",
    },
    {
      x: 2,
      value: fat * 9,
      label: "T",
    },
    {
      x: 3,
      value: carbohydrates * 4,
      label: "W",
    },
  ];
  return (
    <View
      key={entityId}
      style={[
        active
          ? { ...styles.wrapper, backgroundColor: "#555" }
          : styles.wrapper,
      ]}
    >
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.smallText}>{calories} kcal</Text>
        <Text style={styles.smallText}>Białko: {protein} g</Text>
        <Text style={styles.smallText}>Węglodowany: {carbohydrates} g</Text>
        <Text style={styles.smallText}>Tłuszcze: {fat} g</Text>
      </View>

      <View style={styles.container}>
        <VictoryPie
          width={70}
          height={70}
          theme={VictoryTheme.material}
          data={data}
          x="x"
          y="value"
          labelComponent={
            <VictoryLabel style={{ fill: "black", fontSize: 10 }} />
          }
          padding={2}
          labelRadius={({ innerRadius }) => innerRadius + 18}
        />
        <AddRoundedButton
          handlePress={() => checkRecipe(recipe._id)}
          additionalStyling={{ marginTop: 20 }}
          label={active ? "-" : "+"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 3,
  },
  smallText: {
    color: "#aaa",
    fontSize: 12,
  },
  styledButton: {
    width: 30,
    height: 30,
    backgroundColor: "white",
  },
  styledButtonText: {
    color: "white",
  },
  container: {},
});
export default RecipeElement;
