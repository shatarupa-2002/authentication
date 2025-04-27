import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Input({ formData, setFormData, errors, setErrors }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    if (field === "dob") {
      value = formatDOB(value);
      if (value.length === 10 && !isValidDOB(value)) {
        Alert.alert("Invalid DOB", "You must be at least 18 years old.");
      }
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const formatDOB = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length >= 3 && value.length <= 4) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    } else if (value.length > 4) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
    }
    return value;
  };

  const isValidDOB = (dob) => {
    const [month, day, year] = dob.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const validateField = (field, value) => {
    let message = null;
    switch (field) {
      case "name":
        if (!/^[A-Za-z ]+$/.test(value)) message = "Name must only contain letters and spaces.";
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) message = "Invalid email format.";
        break;
      case "password":
        if (!/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{3,20}$/.test(value))
          message = "Password must be 3-20 chars with 1 special character.";
        break;
      case "phone":
        if (!/^[6-9]\d{9}$/.test(value)) message = "Phone number must start with 6,7,8,9 and be 10 digits.";
        break;
      case "address":
        if (value.length < 5) message = "Address too short.";
        break;
      case "dob":
        if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(value))
          message = "DOB must be in MM/DD/YYYY format.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const renderInputField = (field, icon, placeholder, keyboardType = "default", isPassword = false) => {
    const hasError = errors[field];

    return (
      <>
        <View style={[styles.inputWrapper, hasError && styles.errorBorder]}>
          <Ionicons name={icon} size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={formData[field]}
            onChangeText={(text) => handleChange(field, text)}
            keyboardType={keyboardType}
            secureTextEntry={isPassword && !showPassword}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          {isPassword && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          )}
        </View>
        {hasError && <Text style={styles.errorText}>{errors[field]}</Text>}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderInputField("name", "person-outline", "Enter your Name")}
      {renderInputField("email", "mail-outline", "Enter your Email", "email-address")}
      {renderInputField("password", "lock-closed-outline", "Enter your Password", null, true)}
      {renderInputField("phone", "call-outline", "+91 XXXXX XXXXX", "phone-pad")}
      {renderInputField("address", "home-outline", "Enter your Address")}
      {renderInputField("dob", "calendar-outline", "MM/DD/YYYY", "numeric")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 8,
    height: 50,
    backgroundColor: "#f9f9f9",
  },
  errorBorder: {
    borderColor: "red",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: "gray",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 2,
  },
});
