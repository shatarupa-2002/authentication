import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from "react-native";
import Logo from "../src/Logo";
import Welcome from "../src/Welcome";
import Input from "../src/Input";
import Signup from "../src/Signup";
import Account from "../src/Account";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

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
    name: "", email: "", password: "", phone: "", address: "", dob: "",
  });

  // Add userList state to hold all registered users
  const [userList, setUserList] = useState([]);

  const handleSignup = () => {
    const noErrors = Object.values(errors).every(err => err === "");
    const noEmptyFields = Object.values(formData).every(field => field !== "");

    if (!noEmptyFields) {
      Alert.alert("Error", "All fields are mandatory to fill");
      return;
    }

    const newUser = { ...formData };
    const updatedUserList = [...userList, newUser];
    setUserList(updatedUserList);

    Alert.alert("Success", "Signup Successful!");

    const params = {
      formData: JSON.stringify(newUser),
      userList: encodeURIComponent(JSON.stringify(updatedUserList)),
    };

    if (formData.authMethod === "otp") {
      router.push({ pathname: "/OtpLogin", params });
    } else {
      router.push({ pathname: "/Password", params });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.inner}>
          <Logo />
          <Welcome />
          <Input formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />

          <Text style={styles.authTitle}>Choose Authentication Type:</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity style={styles.radioButton} onPress={() => setFormData({ ...formData, authMethod: "otp" })}>
              <View style={[styles.radioCircle, formData.authMethod === "otp" && styles.selected]} />
              <Text style={styles.radioText}>OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioButton} onPress={() => setFormData({ ...formData, authMethod: "password" })}>
              <View style={[styles.radioCircle, formData.authMethod === "password" && styles.selected]} />
              <Text style={styles.radioText}>Password</Text>
            </TouchableOpacity>
          </View>

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
    backgroundColor: "#fff",
  },
  inner: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  authTitle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 8,
  },
  selected: {
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 14,
  },
});
