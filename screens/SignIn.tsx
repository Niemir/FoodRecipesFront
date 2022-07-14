import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { useAppDispatch } from "../store";
import { login } from "../store/auth/authReducer";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { HOME, REGISTER } from "../helpers/screens";
import axios from "axios";

interface SignInProps {
  navigation: NavigationProp<ParamListBase>;
}
const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  return (
    <View style={styles.wrapper}>
      <View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={({ email, password }) => {
            dispatch(login({ email, password }))
              .unwrap()
              .then((data) => {
                // navigation.navigate(HOME);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          validationSchema={validationSchema}>
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <Card style={styles.box}>
              <Card.Title title="FoodRecipes" subtitle="Welcome!" style={{}} />
              <Card.Content>
                <TextInput
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  autoComplete={true}
                  style={styles.input}
                />
                {errors.email && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.email}
                  </Text>
                )}
                <TextInput
                  label="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  autoComplete={false}
                  secureTextEntry={true}
                  style={styles.input}
                />
                {errors.password && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.password}
                  </Text>
                )}
              </Card.Content>
              <Card.Actions style={styles.buttons}>
                <Button
                  mode="contained"
                  style={styles.submit}
                  onPress={handleSubmit}>
                  Log in
                </Button>
                <Button
                  style={styles.register}
                  onPress={() => {
                    navigation.navigate(REGISTER);
                  }}>
                  Register
                </Button>
              </Card.Actions>
            </Card>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recipesWrapper: {},
  box: {
    width: 300,
  },
  input: {
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "column",
    padding: 20,
  },
  submit: {
    width: "100%",
    marginBottom: 30,
  },
  register: {
    width: "100%",
  },
});

export default SignIn;
