import { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
interface SubmitProps {
  handleSubmit: () => void;
  label?: string;
}

const Submit: FC<SubmitProps> = ({ handleSubmit, label = "Zatwierdź" }) => {
  return (
    <Pressable style={style.submit} onPress={handleSubmit}>
      <Text style={style.submitText}>{label}</Text>
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
  },
  submitText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default Submit;
