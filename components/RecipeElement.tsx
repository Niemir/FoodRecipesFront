import { FC } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Card, IconButton, Paragraph, Title } from "react-native-paper";
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
  checkRecipe?: (id: string) => void;
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
    <Card
      key={entityId}
      style={[
        active
          ? { ...styles.wrapper, backgroundColor: "#dfdfdf" }
          : styles.wrapper,
      ]}>
      <Card.Title title={name} subtitle={`${calories} kcal`} />
      <Card.Content>
        <View>
          <Paragraph style={{ fontSize: 10, margin: 0, lineHeight: 10 }}>
            Białko: {protein} g
          </Paragraph>
          <Paragraph style={{ fontSize: 10 }}>
            Węglodowany: {carbohydrates} g
          </Paragraph>
          <Paragraph style={{ fontSize: 10 }}>Tłuszcze: {fat} g</Paragraph>
        </View>

        <AddRoundedButton
          handlePress={() => {
            if (recipe) {
              checkRecipe(recipe._id);
            }
          }}
          additionalStyling={{ position: "absolute", right: 20, bottom: 20 }}
          label={active ? "-" : "+"}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 5,
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
