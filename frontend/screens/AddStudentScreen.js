import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AddStudentForm from '../components/AddStudentForm';
import axios from 'axios';
import Toast from 'react-native-toast-message';


export default function AddStudentScreen() {
  const API_URL = 'http://192.168.1.14:8080/api/students';
  const addStudent = async (student) => {
    try {
      console.log(student);
      const response = await axios.post(API_URL,
        student
      );
      console.log('Student added:', response.data);
      Toast.show({
        type: 'success', // or 'error', 'info'
        text1: 'Success',
        text2: `Student added`
      });

    } catch (error) {
      if (error.response) {
        console.error('Validation errors:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddStudentForm onSubmit={(student) => addStudent(student)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
});
