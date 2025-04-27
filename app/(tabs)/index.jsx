import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Logo from "./../src/Logo";
import Welcome from "./../src/Welcome";
import Input from "./../src/Input";
import Signup from "./../src/Signup";
import Account from "./../src/Account";
import { useState } from "react";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dob: "",
    authMethod: "password",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dob: "",
  });

  const handleSignup = () => {
    const noErrors = Object.values(errors).every((err) => err === "");
    const noEmptyFields = Object.values(formData).every((field) => field !== "");

    if (!noEmptyFields) {
      Alert.alert("Error", "All fields are mandatory to fill");
      return;
    }

    Alert.alert("Success", "Signup Successful!");
    // no error popup now
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <Logo />
          <Welcome />
          <Input
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
          <Signup onPress={handleSignup} />
          <Account />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  inner: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
});
