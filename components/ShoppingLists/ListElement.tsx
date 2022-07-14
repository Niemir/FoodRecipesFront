import { StyleSheet } from "react-native";
import React, { FC, useState } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { deleteRecipe } from "../../api/api";
import {
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { SINGLE_LIST } from "../../helpers/screens";
interface ListElementProps {
  data: any;
  rerenderList: () => void;
  navigation: any;
  mergingMode: boolean;
  handleMergin: (id: string) => void;
  currentMergingList: string[];
}
const ListElement: FC<ListElementProps> = ({
  data,
  rerenderList,
  navigation,
  mergingMode,
  handleMergin,
  currentMergingList,
}) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
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
    <Card
      style={[styles.card, isActive && mergingMode ? styles.cardActive : {}]}
    >
      <Card.Content>
        <Paragraph>Autor: {data?.author?.name}</Paragraph>
        {data?.list?.connected && <Paragraph>Połączona </Paragraph>}
        <Paragraph>{data.list.createdAt}</Paragraph>
        <Card.Actions style={{ padding: 0, justifyContent: "space-between" }}>
          {mergingMode ? (
            <Button
              onPress={() => {
                if (isActive || currentMergingList.length < 2) {
                  setIsActive(!isActive);
                  handleMergin(data.list._id);
                }
              }}
            >
              {isActive ? "Odznacz" : "Zaznacz "}
            </Button>
          ) : (
            <>
              <Button loading={loading} onPress={() => handleDelete()}>
                Usuń
              </Button>
              <Button onPress={handleOpenList} mode="contained">
                Otwórz
              </Button>
            </>
          )}
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
  cardActive: {
    backgroundColor: "#e3e4da",
  },
});
