// app/OtpLogin.jsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function OtpLogin() {
  const router = useRouter();
  const { formData, userList } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [timer, setTimer] = useState(180);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    generateOtp();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setOtpExpired(true);
    }
  }, [timer]);

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setTimer(180);
    setOtpExpired(false);
    setInputDisabled(false);
    setOtp("");
  };

  const handleVerify = () => {
    if (otpExpired) {
      Alert.alert("OTP Expired", "The OTP time limit has expired. Redirecting to login.");
      router.replace("/");
      return;
    }

    if (otp === generatedOtp) {
      Alert.alert("Success", "OTP Verified Successfully");
      router.push({ pathname: "/UserTable", params: { userList } });
    } else {
      const remaining = 2 - attempts;
      setAttempts(attempts + 1);

      if (attempts + 1 >= 3) {
        setInputDisabled(true);
        Alert.alert("Maximum attempts reached", "You can now resend the OTP.");
      } else {
        Alert.alert("Invalid OTP", `Invalid OTP. You have ${remaining}/3 attempts left`);
      }
    }
  };

  const handleResend = () => {
    if (resendAttempts >= 3) {
      Alert.alert("Locked Out", "Too many resend attempts. Redirecting to login.");
      setTimeout(() => router.replace("/"), 1000);
      return;
    }

    setResendAttempts(resendAttempts + 1);
    setAttempts(0);
    generateOtp();
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.otpDisplay}>OTP: {generatedOtp}</Text>
      <TextInput
        style={[styles.input, inputDisabled && styles.disabledInput, attempts > 0 && styles.errorInput]}
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        editable={!inputDisabled}
        maxLength={6}
        placeholder="Enter OTP"
      />
      <Text style={styles.timer}>Time Remaining: {formatTimer()}</Text>

      <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={inputDisabled}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      {inputDisabled && (
        <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  otpDisplay: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  errorInput: {
    borderColor: "red",
  },
  disabledInput: {
    backgroundColor: "#eee",
  },
  timer: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resendButton: {
    alignItems: "center",
    marginTop: 10,
  },
  resendText: {
    color: "#007BFF",
  },
});
