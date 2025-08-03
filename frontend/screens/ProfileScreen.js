import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    SafeAreaView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const { logout } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const info = await AsyncStorage.getItem('userEmail');
            if (info) setUserInfo(info);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error loading user info',
            });
        }
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await logout();
                        Toast.show({ type: 'success', text1: 'Logged out successfully' });
                    } catch (err) {
                        Toast.show({ type: 'error', text1: 'Logout failed' });
                    }
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>👤 Profile</Text>

                {userInfo ? (
                    <>
                        <View style={styles.infoBox}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.value}>{userInfo}</Text>
                        </View>
                    </>
                ) : (
                    <Text style={styles.info}>No user info available.</Text>
                )}

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: Platform.OS === 'android' ? 24 : 0,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: '700',
        color: '#222',
        marginBottom: 30,
    },
    infoBox: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    info: {
        fontSize: 16,
        color: '#666',
        marginVertical: 20,
    },
    logoutBtn: {
        marginTop: 40,
        alignSelf: 'center',
        backgroundColor: '#e53935',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
