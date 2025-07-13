import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AddStudentForm from '../components/AddStudentForm';

export default function AddStudentScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AddStudentForm onSubmit={(student) => console.log('Submitted:', student)} />
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
