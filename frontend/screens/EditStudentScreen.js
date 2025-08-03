import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AddStudentForm from '../components/AddStudentForm';
import axios from 'axios';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditStudentScreen = ({ route, navigation }) => {
    const { student } = route.params;
    const API_URL = 'http://192.168.1.14:8080/api/students';
    const updateStudent = async (updatedData) => {
        const token = await AsyncStorage.getItem('token');
        try {
            await axios.put(`${API_URL}/${student.id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Toast.show({ type: 'success', text1: 'Student updated' });
            navigation.goBack();
        } catch (err) {
            Toast.show({ type: 'error', text1: 'Update failed' });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <AddStudentForm
                initialData={student}
                isEdit
                onSubmit={updateStudent}
            />
        </SafeAreaView>
    );
};
export default EditStudentScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
    },
});
