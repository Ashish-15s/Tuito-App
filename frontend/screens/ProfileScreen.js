// screens/ProfileScreen.js
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfileScreen({ navigation }) {
    const { userToken, logout } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        getUserInfo();
    }, []);


    const getUserInfo = async () => {
        const info = await AsyncStorage.getItem('userEmail');
        setUserInfo(info);
        console.log(userInfo);
    }


    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await logout(); // clears token
                        Toast.show({ type: 'success', text1: 'Logged out' });
                        // navigation reset if needed:
                        // navigation.reset({
                        //     index: 0,
                        //     routes: [{ name: 'Home' }], // adjust name to your auth entry screen
                        // });
                    } catch (err) {
                        Toast.show({ type: 'error', text1: 'Logout failed' });
                    }
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            {userInfo ? (
                <>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userInfo}</Text>

                </>
            ) : (
                <Text style={styles.info}>No user info available.</Text>
            )}
            <View style={styles.logoutButton}>
                <Button title="Logout" onPress={handleLogout} color="#d9534f" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginTop: 8,
        fontWeight: '600',
        color: '#555',
    },
    value: {
        fontSize: 16,
        marginBottom: 4,
    },
    info: {
        fontSize: 16,
        marginVertical: 12,
        color: '#666',
    },
    logoutButton: {
        marginTop: 40,
    },
});
