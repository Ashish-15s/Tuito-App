// screens/PasswordLoginScreen.js

import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
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

            user = {
                email,
                password
            }

            const response = await axios.post(API_URL, user);
            const jwtToken = response.data;

            await AsyncStorage.setItem('token', jwtToken);
            await AsyncStorage.setItem('userEmail', email);
            await login(jwtToken);


            Toast.show({ type: 'success', text1: 'Login Successful' });
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Login Failed', text2: error.message });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Password Login</Text>
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
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Login" onPress={handlePasswordLogin} />

            {/* <TouchableOpacity onPress={() => navigation.navigate('OtpLogin')}>
                <Text style={styles.link}>Login with OTP</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
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
