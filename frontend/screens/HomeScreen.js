import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, StyleSheet, ScrollView, Alert, ActivityIndicator, Text } from 'react-native';
import StudentList from '../components/StudentList';
import axios from 'axios';
import Toast from 'react-native-toast-message';


import FilterBar from '../components/FilterBar';

export default function HomeScreen() {


  const [loading, setLoading] = useState(false);

  const API_URL = 'http://192.168.1.14:8080/api/students';
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setStudents([...response.data]); // force new array
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching students',
        text2: error.message
      });

      console.error('Error fetching students:', error.message);
    }
    finally {
      setLoading(false);
    }

  };


  const [students, setStudents] = useState([
  ]
  );


  // Toggle paid
  const togglePaid = async (id) => {
    const previousStudents = [...students];
    const updated = students.map(s =>
      s.id === id ? { ...s, isPaid: !s.isPaid } : s
    );
    setStudents(updated); // instantly update UI
    try {

      await axios.put(`${API_URL}/${id}/togglePaid`);

      Toast.show({
        type: 'success', // or 'error', 'info'
        text1: 'Success',
        text2: `Payment status changed}`
      });

    }
    catch (error) {
      setStudents(previousStudents);
      Toast.show({
        type: 'error',
        text1: 'Error while updating paid',
      });
    }
  };


  //  Delete
  const deleteStudent = async (id) => {
    const previousStudents = [...students];
    setStudents(prev => prev.filter(s => s.id !== id));
    try {
      await axios.delete(`${API_URL}/${id}`);
      //console.log("Delete student: ", response.data);
      Toast.show({
        type: 'success',
        text1: 'Student Deleted',

      });
    }
    catch (error) {
      setStudents(previousStudents);
      Toast.show({
        type: 'error',
        text1: 'Error while deleting user',

      });

      console.log("Error while deleting usr:", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [])
  );

  const [filter, setFilter] = useState({
    showPaid: false,
    showUnpaid: true,
  });

  //  Sort by name
  const sortByName = () => {
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
    setStudents(sorted);
  };

  // Sort by standard
  const sortByStandard = () => {
    const sorted = [...students].sort((a, b) => a.standard.localeCompare(b.standard));
    setStudents(sorted);
  };




  const filteredStudents = students.filter(student => {
    if (student.isPaid && filter.showPaid) return true;
    if (!student.isPaid && filter.showUnpaid) return true;
    return false;
  });


  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button title="Sort by Name" onPress={sortByName} />
        <Button title="Sort by Standard" onPress={sortByStandard} />
      </View>
      <FilterBar filter={filter} setFilter={setFilter} />


      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <StudentList
          students={filteredStudents}
          onDelete={deleteStudent}
          onTogglePaid={togglePaid}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  }

});
