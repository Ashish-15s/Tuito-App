import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function StudentCard({ name, standard, dueFee, isPaid, fee, phone, onDelete, onTogglePaid, onEdit }) {
  const sendWhatsApp = () => {
    if (!phone) {
      Alert.alert("Missing Phone Number", "Student doesn't have a phone number.");
      return;
    }

    const message = `Hello ${name}, this is a reminder that your fee of ₹${dueFee} is due. Please make the payment.`;
    const url = `whatsapp://send?phone=+91${phone}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("WhatsApp not installed", "Please install WhatsApp to send messages.");
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>Standard: {standard}</Text>
        <Text style={styles.detail}>Due Fee: ₹{dueFee}</Text>
        <Text style={styles.detail}>Monthly Fee: ₹{fee}</Text>
        <Text style={[styles.badge, isPaid ? styles.paid : styles.unpaid]}>
          {isPaid ? 'Paid' : 'Unpaid'}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="create-outline" size={24} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onTogglePaid}>
          <Ionicons name="refresh-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendWhatsApp}>
          <FontAwesome name="whatsapp" size={24} color="green" />
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
