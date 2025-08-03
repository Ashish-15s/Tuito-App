// screens/SignupScreen.js

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';;
import Toast from 'react-native-toast-message';
import { AuthContext } from '../context/AuthContext';

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
            user = {
                email,
                password,
                userName
            }
            await axios.post(API_URL, user);
            Toast.show({ type: 'success', text1: 'Account Created' });
            navigation.navigate('PasswordLogin');
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Signup Failed', text2: error.message });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={userName}
                onChangeText={setName}
                // keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password (min 6 chars)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Sign Up" onPress={handleSignup} />

            {/* <TouchableOpacity onPress={() => navigation.navigate('OtpLogin')}>
                <Text style={styles.link}>Login with OTP</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => navigation.navigate('PasswordLogin')}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, padding: 10 },
    link: { color: 'blue', marginTop: 10, textAlign: 'center' }
});
