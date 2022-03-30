import { StyleSheet } from "react-native";
import React, { FC, useState } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { deleteRecipe } from "../../api/api";
import {
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { SINGLE_LIST } from "../../App";
interface ListElementProps {
  data: any;
  rerenderList: () => void;
  navigation: any;
}
const ListElement: FC<ListElementProps> = ({
  data,
  rerenderList,
  navigation,
}) => {
  const [loading, setLoading] = useState(false);

  const handleOpenList = () => {
    navigation.navigate(SINGLE_LIST, {
      listId: data.list._id,
    });
  };
  const handleDelete = () => {
    setLoading(true);
    deleteRecipe(data.list._id)
      .then(() => rerenderList())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Paragraph>Autor: {data.author.name}</Paragraph>
        <Paragraph>{data.list.createdAt}</Paragraph>
        <Card.Actions style={{ padding: 0, justifyContent: "space-between" }}>
          <Button loading={loading} onPress={() => handleDelete()}>
            Usuń
          </Button>
          <Button onPress={handleOpenList} mode="contained">
            Otwórz
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};

export default ListElement;

const styles = StyleSheet.create({
  card: {
    marginBottom: 5,
  },
});
