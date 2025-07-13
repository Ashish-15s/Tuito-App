import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import StudentCard from './StudentCard';

export default function StudentList({ students, onDelete, onTogglePaid }) {
  if (!students || students.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No students added yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={students}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <StudentCard
          key={item.id}
          name={item.name}
          standard={item.standard}
          fee={item.fee}
          isPaid={item.isPaid}
          onDelete={() => onDelete(item.id)}
          onTogglePaid={() => onTogglePaid(item.id)}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
