import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
interface Recipe {
  entityId: string;
  ingredientsNames: string[];
  ingredientsQty: string[];
  ingredientsUnits: string[];
  title: string;
}

const Home = ({ navigation }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {}, []);

  const api = () => {
    console.log("eun");
    fetch("http://192.168.1.135:5000/getRecipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screedn</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Add Recipe")}
      />
      <Button title="Fetch" onPress={api} />

      {recipes &&
        recipes.map(
          ({
            entityId,
            title,
            ingredientsNames,
            ingredientsQty,
            ingredientsUnits,
          }) => (
            <View key={entityId} style={{ flexDirection: "row" }}>
              <Text>{title}</Text>
              {ingredientsNames.map((ingredient, id) => (
                <Text>
                  {ingredientsNames[id]} {ingredientsQty[id]}{" "}
                  {ingredientsUnits[id]}
                </Text>
              ))}
            </View>
          )
        )}
    </View>
  );
};

export default Home;
