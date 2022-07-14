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
import { Button, Paragraph } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import api, { getShoppingLists, mergeShoppingLists } from "../api/api";
import ListElement from "../components/ShoppingLists/ListElement";
import { useAppDispatch } from "../store";
interface ShoppingListInterface {}
const ShoppingList: FC = ({ navigation }) => {
  const days = useSelector((state) => state.recipes.shoppingList);
  const dispatch = useAppDispatch();
  const [shoppingLists, setShoppingLists] = useState([]);
  const { token } = useSelector((state) => state.auth.user);
  const [mergingMode, setMergingMode] = useState(false);
  const [mergingList, setMergingList] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(0);

  const rerenderList = async () => {
    await getShoppingLists(token).then((data) =>
      setShoppingLists(data.data.withAuthors)
    );
  };

  const handleMerginList = (id: string) => {
    if (mergingList.includes(id)) {
      setMergingList(mergingList.filter((list) => list !== id));
    } else {
      setMergingList([...mergingList, id]);
    }
  };
  useEffect(() => {
    console.log(mergingList);
  }, [mergingList]);

  useEffect(() => {
    if (token) {
      const setLists = async () => {
        await getShoppingLists(token).then((data) =>
          setShoppingLists(data.data.withAuthors)
        );
      };
      setLists();
    }
  }, [token, refresh]);

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
      <View style={styles.top}>
        <Button mode="contained" onPress={() => setMergingMode(!mergingMode)}>
          Tryb łączenia
        </Button>
        <Paragraph style={{ marginHorizontal: 20 }}>
          {mergingList.length}/2
        </Paragraph>
        <Button
          mode="outlined"
          disabled={mergingList.length < 2}
          onPress={async () => {
            mergeShoppingLists(mergingList[0], mergingList[1], token).then(
              (data) => setRefresh(refresh + 1)
            );
          }}
        >
          Połącz
        </Button>
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.list,
          mergingMode ? styles.listActive : {},
        ]}
      >
        {shoppingLists.map((list) => (
          <ListElement
            key={list.list._id}
            data={list}
            rerenderList={rerenderList}
            navigation={navigation}
            mergingMode={mergingMode}
            handleMergin={handleMerginList}
            currentMergingList={mergingList}
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
    paddingBottom: 50,
  },
  listActive: {
    backgroundColor: "yellow",
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
  },
});
