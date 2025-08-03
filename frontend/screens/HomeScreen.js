import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList
} from 'react-native';
import StudentList from '../components/StudentList';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterBar from '../components/FilterBar';
import { Ionicons } from '@expo/vector-icons'; // For FAB icon

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
      Toast.show({ type: 'success', text1: 'Payment status changed' });
    } catch (error) {
      setStudents(previousStudents);
      Toast.show({ type: 'error', text1: 'Error while updating paid' });
    }
  };

  const deleteStudent = async (id) => {
    const previousStudents = [...students];
    setStudents((prev) => prev.filter((s) => s.id !== id));
    try {
      await axios.delete(`${API_URL}/${id}`);
      Toast.show({ type: 'success', text1: 'Student Deleted' });
    } catch (error) {
      setStudents(previousStudents);
      Toast.show({ type: 'error', text1: 'Error while deleting user' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
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
      <Text style={styles.heading}>Student Fee Tracker</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.sortButton} onPress={sortByName}>
          <Text style={styles.sortText}>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={sortByStandard}>
          <Text style={styles.sortText}>Sort by Class</Text>
        </TouchableOpacity>
      </View>

      <FilterBar filter={filter} setFilter={setFilter} />

      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <StudentList
          students={filteredStudents}
          onDelete={deleteStudent}
          onTogglePaid={togglePaid}
          onEdit={handleEditStudent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add Student')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sortButton: {
    backgroundColor: '#4B7BE5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  sortText: {
    color: '#fff',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#F5A623',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
});
