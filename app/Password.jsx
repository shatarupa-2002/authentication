// app/Password.jsx
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'; // Eye icon

export default function Password() {
  const router = useRouter();
  const { formData, userList } = useLocalSearchParams();

  const parsedFormData = JSON.parse(formData);
  const parsedUserList = JSON.parse(decodeURIComponent(userList));

  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const handleSubmit = () => {
    if (disabled || success) return;

    if (inputPassword === parsedFormData.password) {
      Alert.alert('Success', 'Password matched!');
      setSuccess(true);
      setTimeout(() => {
        router.push({
          pathname: '/UserTable',
          params: { userList: encodeURIComponent(JSON.stringify(parsedUserList)) },
        });
      }, 1000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setDisabled(true);
        setError('Maximum attempts reached. Try again later.');
        Alert.alert('Failed', 'Too many attempts.');
      } else {
        setError(`Password does not match. You have ${3 - newAttempts} attempts left.`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your password:</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            error ? styles.errorBorder : null,
            (disabled || success) && styles.disabled,
          ]}
          value={inputPassword}
          onChangeText={setInputPassword}
          secureTextEntry={!showPassword}
          editable={!disabled && !success}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={[styles.button, (disabled || success) && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={disabled || success}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    paddingRight: 40,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  errorBorder: {
    borderColor: 'red',
  },
  disabled: {
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
