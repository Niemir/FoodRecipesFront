import { View, Text } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, Card, List, Paragraph } from "react-native-paper";
import { getShoppingList, updateIngredientValue } from "../api/api";

import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { EDIT, RECIPES } from "../helpers/screens";
import { useSelector } from "react-redux";
interface SingleListProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}
const SingleList: FC<SingleListProps> = ({ route, navigation }) => {
  const { token } = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const listId = route?.params?.listId;

  const getList = () => {
    getShoppingList(listId)
      .then((data) => setData(data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getList();
  }, []);

  const openIngredient = (id) => {
    navigation.navigate(RECIPES, {
      screen: EDIT,
      params: {
        el: id,
        recipeId: id,
      },
    });
  };

  const updateIngredients = (name: string, value: boolean) => {
    updateIngredientValue(listId, name, value).then(() => getList());
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Card>
            <Card.Content>
              <Paragraph>Na dzień XX</Paragraph>
            </Card.Content>
          </Card>
          <List.AccordionGroup>
            <List.Accordion title="Przepisy" id="1">
              {data.recipes.map((recipe) => (
                <List.Item
                  key={recipe._id}
                  onPress={() => openIngredient(recipe._id)}
                  title={recipe.name}
                  description={`Kcal: ${recipe.calories}    B: ${recipe.protein} W: ${recipe.carbohydrates} T: ${recipe.fat}`}
                />
              ))}
            </List.Accordion>
            <List.Accordion title="Składniki" id="2">
              {/* dodać tutaj listing skaldnikow, listing najlpiej zrobic po stronie
              backendu i naprawic przejscie do edycji przepisow */}
              <List.Item title="Item 2" />
            </List.Accordion>
          </List.AccordionGroup>
          <List.Section>
            {data.ingredients.map((ingredient) => (
              <List.Item
                key={ingredient.uuid}
                onPress={() =>
                  updateIngredients(ingredient.name, !ingredient.value)
                }
                title={ingredient.name}
                description={`Ilość: ${ingredient.qty} ${ingredient.unit}`}
                left={() => (
                  <List.Icon
                    color="#000"
                    icon={
                      ingredient.value ? "check-circle-outline" : "check-circle"
                    }
                  />
                )}
              />
            ))}
          </List.Section>
        </View>
      )}
    </View>
  );
};

export default SingleList;
