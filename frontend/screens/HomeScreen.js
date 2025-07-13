import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import StudentList from '../components/StudentList';

import FilterBar from '../components/FilterBar';

export default function HomeScreen() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', standard: '7th', fee: '1200', isPaid: true },
    { id: 2, name: 'Riya Patel', standard: '10th', fee: '1500', isPaid: false },
  ]);

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

  //  Delete
  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Toggle paid
  const togglePaid = (id) => {
    const updated = students.map(s =>
      s.id === id ? { ...s, isPaid: !s.isPaid } : s
    );
    setStudents(updated);
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



      <StudentList
        students={filteredStudents}
        onDelete={deleteStudent}
        onTogglePaid={togglePaid}
      />

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
