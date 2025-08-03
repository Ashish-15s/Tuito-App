import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

function AddStudentForm({ onSubmit, initialData = {}, isEdit = false }) {
  const [name, setName] = useState(initialData.name || '');
  const [standard, setStandard] = useState(initialData.standard || '');
  const [fee, setFee] = useState(
    initialData.fee != null ? initialData.fee.toString() : ''
  );
  const [dueFee, setDueFee] = useState(
    initialData.dueFee != null ? initialData.dueFee.toString() : ''
  );
  const [phone, setPhone] = useState(initialData.phone || '');
  const [dueDate, setDueDate] = useState(
    initialData.dueDate != null ? initialData.dueDate.toString() : ''
  );

  const handleSubmit = () => {
    if (!name || !standard || !fee || !phone || !dueDate) {
      Alert.alert("Missing Fields", "Please fill out all required fields.");
      return;
    }

    if (isNaN(fee) || parseFloat(fee) <= 0) {
      Alert.alert("Invalid Fee", "Please enter a valid monthly fee amount.");
      return;
    }

    if (isEdit && (isNaN(dueFee) || parseFloat(dueFee) < 0)) {
      Alert.alert("Invalid Due Fee", "Due fee should be a valid number (0 or more).");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert("Invalid Phone", "Phone number should be exactly 10 digits.");
      return;
    }
    if (isNaN(dueDate) || dueDate < 1 || dueDate > 31) {
      Alert.alert("Invalid Date", "Please enter a day between 1 and 31.");
      return;
    }

    const newStudent = {
      name,
      standard,
      fee,
      phone,
      dueDate,
    };

    // If editing, include the ID
    if (isEdit && initialData.id) {
      newStudent.id = initialData.id;
      newStudent.dueFee = dueFee;
    } else {
      newStudent.isPaid = false; // default for new students
    }
    console.log(newStudent)

    if (onSubmit) {
      onSubmit(newStudent);
    }

    // Reset only if adding
    if (!isEdit) {
      setName('');
      setStandard('');
      setFee('');
      setPhone('');
      setDueDate('');
    }
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

      {isEdit && (
        <>
          <Text style={styles.label}>Due Fee (₹)</Text>
          <TextInput
            style={styles.input}
            placeholder="Due fee"
            value={dueFee}
            onChangeText={setDueFee}
            keyboardType="numeric"
          />
        </>
      )}

      <Text style={styles.label}>Phone No</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone No"
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fee Due Day</Text>
      <TextInput
        style={styles.input}
        placeholder="Fee Day"
        value={dueDate}
        onChangeText={setDueDate}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button
          title={isEdit ? "Update Student" : "Add Student"}
          onPress={handleSubmit}
        />
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
