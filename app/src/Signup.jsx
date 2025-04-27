import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Signup({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.signup}>Signup</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signup: {
    fontSize: 18,
    backgroundColor: "lightblue",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
});