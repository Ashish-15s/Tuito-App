import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StudentCard({ name, standard, fee, isPaid, onDelete, onTogglePaid }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>Standard: {standard}</Text>
        <Text style={styles.detail}>Fee: ₹{fee}</Text>
        <Text style={[styles.badge, isPaid ? styles.paid : styles.unpaid]}>
          {isPaid ? 'Paid' : 'Unpaid'}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onTogglePaid}>
          <Ionicons name="refresh-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  detail: { fontSize: 14, color: '#555' },
  badge: {
    marginTop: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  paid: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  unpaid: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});
