import { FC } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";

interface SubmitProps {
  handleSubmit: () => void;
  label?: string;
  isLoading?: boolean;
  status: "idle" | "success" | "error";
}

const Submit: FC<SubmitProps> = ({
  handleSubmit,
  label = "Dodaj",
  isLoading = false,
  status = "idle",
}) => {
  console.log(isLoading);
  return (
    <Pressable style={style.submit} onPress={handleSubmit}>
      {isLoading ? (
        status === "idle" ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : status === "success" ? (
          <Text style={[style.submitText, style.success]}>Udało się</Text>
        ) : (
          <Text style={[style.submitText, style.error]}>Nie udało się</Text>
        )
      ) : (
        <Text style={style.submitText}>{label}</Text>
      )}
    </Pressable>
  );
};

const style = StyleSheet.create({
  submit: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 20,
    height: 50,
  },
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
