import { FC, useState } from "react";
import { View, Text } from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { useSelector } from "react-redux";
import api from "../../api/api";
import { Recipe } from "../../screens/Recipes/AddRecipe";
import Authors from "../AddRecipes/Authors";
interface HeaderProps {
  recipes: Recipe[];
  submitDay: (type: "add" | "remove") => void;
  dayID: number;
  addDayDisabled: boolean;
}
const Header: FC<HeaderProps> = ({
  recipes,
  submitDay,
  dayID,
  addDayDisabled,
}) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);
  const days = useSelector((state) => state.recipes.shoppingList);
  const { token } = useSelector((state) => state.auth.user);
  const activeRecipes = recipes.filter((recipe) => recipe.active);
  const activeRecipesLength = activeRecipes.length;

  const isDaySubmited = days[dayID].length > 0;
  const submitedDaysCount = Object.values(days).filter(
    (day) => day.length > 0
  ).length;

  const getRecipesIDs = () => {
    const recipesIDs = Object.values(days)
      .filter((day) => day.length > 0)
      .map((day) => day[0].map((recipe) => recipe._id))
      .map((day) => day);
    const mergedRecipes = [].concat.apply([], recipesIDs);

    console.log(mergedRecipes);
    return mergedRecipes;
  };

  const caloriesSum =
    activeRecipesLength > 0 &&
    activeRecipes
      .map((recipe) => recipe.calories)
      .reduce((acc, curr) => Number(acc) + Number(curr));

  return (
    <View
      style={{
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <View>
        <Text style={{ color: "black" }}>
          Posiłki {activeRecipesLength} / 4
        </Text>
        <Text>Kalorie: {caloriesSum}</Text>
      </View>
      <View>
        <Button
          style={{ marginBottom: 5 }}
          mode="outlined"
          onPress={() => submitDay(isDaySubmited ? "remove" : "add")}
          disabled={addDayDisabled}
        >
          {isDaySubmited ? "Usuń dzień z listy" : "Zatwierdź dzień"}
        </Button>
        <Button
          mode="contained"
          onPress={showDialog}
          disabled={submitedDaysCount === 0}
        >
          Dodaj listę zakupów
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Dodawanie listy zakupów</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Jesteś pewny, że chcesz dodać listę zakupów dla{" "}
              {submitedDaysCount} {submitedDaysCount === 1 ? "dnia" : "dni"}?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Nie</Button>
            <Button
              mode="contained"
              style={{ marginLeft: 20 }}
              onPress={() => {
                api.post("shoppinglist/add", {
                  recipes: getRecipesIDs(),
                  token,
                });
                hideDialog();
              }}
            >
              Tak
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Header;
