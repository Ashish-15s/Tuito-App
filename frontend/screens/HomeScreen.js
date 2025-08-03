import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import StudentList from '../components/StudentList';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterBar from '../components/FilterBar';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState({
    showPaid: false,
    showUnpaid: true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const API_URL = 'http://192.168.1.14:8080/api/students';
  const navigation = useNavigation();

  const handleEditStudent = (student) => {
    navigation.navigate('EditStudentScreen', { student });
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents([...response.data]);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching students',
        text2: error.message,
      });
      console.error('Error fetching students:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePaid = async (id) => {
    const previousStudents = [...students];
    const updated = students.map((s) =>
      s.id === id ? { ...s, isPaid: !s.isPaid } : s
    );
    setStudents(updated);
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(`${API_URL}/${id}/togglePaid`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Payment status changed`,
      });
    } catch (error) {
      setStudents(previousStudents);
      Toast.show({
        type: 'error',
        text1: 'Error while updating paid',
      });
    }
  };

  const deleteStudent = async (id) => {
    const previousStudents = [...students];
    setStudents((prev) => prev.filter((s) => s.id !== id));
    try {
      await axios.delete(`${API_URL}/${id}`);
      Toast.show({
        type: 'success',
        text1: 'Student Deleted',
      });
    } catch (error) {
      setStudents(previousStudents);
      Toast.show({
        type: 'error',
        text1: 'Error while deleting user',
      });
    }
  };

  // Debounce logic: wait 300ms after typing stops
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer); // cancel on re-type
  }, [searchQuery]);

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [])
  );

  const sortByName = () => {
    const sorted = [...students].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setStudents(sorted);
  };

  const sortByStandard = () => {
    const sorted = [...students].sort((a, b) =>
      a.standard.localeCompare(b.standard)
    );
    setStudents(sorted);
  };

  // Filter + Search
  const filteredStudents = students.filter((student) => {
    const matchesPayment =
      (student.isPaid && filter.showPaid) ||
      (!student.isPaid && filter.showUnpaid);
    const matchesSearch = student.name
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase());
    return matchesPayment && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

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
          onEdit={handleEditStudent}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
