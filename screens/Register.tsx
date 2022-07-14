import { NavigationProp, ParamListBase } from "@react-navigation/native";
import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button, TextInput, IconButton, Title } from "react-native-paper";
import * as Yup from "yup";
import { SIGNIN } from "../helpers/screens";
import { useAppDispatch } from "../store";
import { register } from "../store/auth/authReducer";

interface RegisterProps {
  navigation: NavigationProp<ParamListBase>;
}
const Register: FC<RegisterProps> = ({ navigation }) => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 4 and 40 characters.",
        (val) =>
          val && val.toString().length >= 4 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });
  return (
    <View style={styles.wrapper}>
      <View>
        {successful ? (
          <Card style={styles.box}>
            <Card.Content>
              <Title style={{ color: "green" }}>Udało się dodać konto!</Title>
              <Button
                mode="contained"
                onPress={() => navigation.navigate(SIGNIN)}
                style={{ marginTop: 20 }}
              >
                Wróć do logowania
              </Button>
            </Card.Content>
          </Card>
        ) : (
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={({ username, email, password }) => {
              dispatch(register({ username, email, password }))
                .unwrap()
                .then((data) => {
                  setSuccessful(true);
                })
                .catch(() => {
                  setSuccessful(false);
                });
            }}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <Card style={styles.box}>
                <IconButton
                  icon="arrow-left"
                  size={20}
                  onPress={() => navigation.navigate(SIGNIN)}
                />
                <Card.Title
                  title="Register"
                  subtitle="Add new account"
                  style={{}}
                />
                <Card.Content>
                  <TextInput
                    label="Name"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    autoComplete={true}
                    style={styles.input}
                  />
                  {errors.username && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.username}
                    </Text>
                  )}
                  <TextInput
                    label="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    autoComplete={true}
                    style={styles.input}
                    placeholder="mail@gmail.com"
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
                  <Button style={styles.register} onPress={handleSubmit}>
                    Register Account
                  </Button>
                </Card.Actions>
              </Card>
            )}
          </Formik>
        )}
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

export default Register;
