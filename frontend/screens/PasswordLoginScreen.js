import React, { useContext, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function PasswordLoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handlePasswordLogin = async () => {
        try {
            const API_URL = 'http://192.168.1.14:8080/api/auth/login';

            const user = { email, password };
            const response = await axios.post(API_URL, user);
            const jwtToken = response.data;

            await AsyncStorage.setItem('token', jwtToken);
            await AsyncStorage.setItem('userEmail', email);
            await login(jwtToken);

            Toast.show({ type: 'success', text1: 'Login Successful' });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: error?.response?.data?.message || error.message,
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={styles.title}>Welcome Back</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#aaa"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#aaa"
            />

            <TouchableOpacity style={styles.button} onPress={handlePasswordLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    button: {
        backgroundColor: '#1976D2',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    link: {
        color: '#1976D2',
        fontSize: 14,
        textAlign: 'center',
    },
});
