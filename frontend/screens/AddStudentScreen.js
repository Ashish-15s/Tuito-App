import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AddStudentForm from '../components/AddStudentForm';
import axios from 'axios';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddStudentScreen() {
  const API_URL = 'http://192.168.1.14:8080/api/students';

  const addStudent = async (student) => {
    const token = await AsyncStorage.getItem('token');
    try {
      console.log(student);
      const response = await axios.post(API_URL,
        student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      console.log('Student added:', response.data);
      Toast.show({
        type: 'success', // or 'error', 'info'
        text1: 'Success',
        text2: `Student added`
      });

    } catch (error) {
      console.error('Validation errors:', error.message);
      Toast.show({
        type: 'error', // or 'error', 'info'
        text1: 'Error while adding student',
      });

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
    justifyContent: 'center', // center vertically
    padding: 16,
  },
});
