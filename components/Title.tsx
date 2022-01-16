import { FC } from "react";
import { StyleSheet, Text } from "react-native";

const Title: FC = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
  },
});

export default Title;
