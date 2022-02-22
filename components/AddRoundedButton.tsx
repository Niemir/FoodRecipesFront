import { FC } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
interface AddRoundedButtonProps {
  handlePress: () => void;
  invert?: boolean;
  additionalStyling?: StyleProp<ViewStyle>;
  label?: string;
}
const AddRoundedButton: FC<AddRoundedButtonProps> = ({
  handlePress,
  invert = false,
  additionalStyling,
  label = "+",
}) => {
  return (
    <Pressable
      style={[styles.add, invert && styles.invertButton, additionalStyling]}
      onPress={handlePress}
    >
      <Text style={[styles.addText, invert && styles.invertButtonText]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
    marginLeft: 0,
  },
  add: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "flex-end",
    marginLeft: 15,
    marginBottom: 5,
    backgroundColor: "white",
  },
  addText: {
    textAlign: "center",
    fontSize: 26,
    textAlignVertical: "center",
    color: "black",
  },
  invertButton: {
    backgroundColor: "white",
  },
  invertButtonText: {
    color: "white",
  },
});
export default AddRoundedButton;
