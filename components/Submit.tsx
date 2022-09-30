import { FC } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import Svg, { Circle, Rect } from "react-native-svg";

interface SubmitProps {
  handleSubmit: () => void;
  label?: string;
  status: "idle" | "loading" | "success" | "error";
}

const Submit: FC<SubmitProps> = ({
  handleSubmit,
  label = "Dodaj",
  status = "idle",
}) => {
  const isLoading = status === "loading";
  return (
    <Button
      mode="contained"
      onPress={handleSubmit}
      loading={isLoading}
      disabled={isLoading}>
      {isLoading || status === "idle"
        ? label
        : status === "success"
        ? "Udało się"
        : "Nie udało się"}
    </Button>
  );
};

const style = StyleSheet.create({
  submitText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
});

export default Submit;
