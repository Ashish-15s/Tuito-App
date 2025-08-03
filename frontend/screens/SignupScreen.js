// screens/SignupScreen.js

import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setName] = useState('');

    const handleSignup = async () => {
        const API_URL = 'http://192.168.1.14:8080/api/auth/signup';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password || !userName) {
            Toast.show({ type: 'error', text1: 'All fields are required' });
            return;
        }

        if (!emailRegex.test(email)) {
            Toast.show({ type: 'error', text1: 'Invalid email format' });
            return;
        }

        if (password.length < 6) {
            Toast.show({ type: 'error', text1: 'Password must be at least 6 characters' });
            return;
        }

        try {
            const user = { email, password, userName };
            await axios.post(API_URL, user);
            Toast.show({ type: 'success', text1: 'Account Created' });
            navigation.navigate('PasswordLogin');
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Signup Failed', text2: error.message });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={userName}
                onChangeText={setName}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Password (min 6 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PasswordLogin')}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fefefe',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        marginBottom: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#1e90ff',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    link: {
        color: '#1e90ff',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 14,
    },
});
