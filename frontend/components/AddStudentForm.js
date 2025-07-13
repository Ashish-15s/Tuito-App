import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

function AddStudentForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [standard, setStandard] = useState('');
  const [fee, setFee] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !standard.trim() || !fee.trim() || !phone.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const newStudent = {
      name,
      standard,
      fee,
      isPaid: false, // default when new student is added
      phone,
    };

    if (onSubmit) {
      onSubmit(newStudent);
    }

    // Reset form
    setName('');
    setStandard('');
    setFee('');
    Alert.alert('Success', 'Student added successfully!');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Student Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Class / Standard</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 10th"
        value={standard}
        onChangeText={setStandard}
      />

      <Text style={styles.label}>Monthly Fee (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter fee"
        value={fee}
        onChangeText={setFee}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Phone No (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone No"
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Student" onPress={handleSubmit} />
      </View>
    </View>
  );
}

export default AddStudentForm;
const styles = StyleSheet.create({
  form: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    elevation: 2,
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

