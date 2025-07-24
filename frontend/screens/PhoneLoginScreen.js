// screens/PhoneLoginScreen.js
import React, { useRef, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth, PhoneAuthProvider, firebaseConfig } from "../firebaseConfig";


export default function PhoneLoginScreen({ navigation }) {
    const recaptchaVerifier = useRef(null);
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const sendOTP = async () => {
        setMessage("");
        try {
            const provider = new PhoneAuthProvider(auth);
            const verificationId = await provider.verifyPhoneNumber(
                phone,
                recaptchaVerifier.current
            );
            setMessage("✅ OTP sent!");
            navigation.navigate("OtpVerify", { verificationId, phone });
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={false}
            />

            <Text style={styles.label}>Enter your phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="+1 555 123 4567"

                value={phone}
                onChangeText={setPhone}
            />

            <Button title="Send OTP" onPress={sendOTP} disabled={!phone} />
            {message ? <Text style={styles.message}>{message}</Text> : null}

            <TouchableOpacity onPress={() => navigation.navigate('PasswordLogin')}>
                <Text style={{ color: 'blue', marginTop: 10 }}>Login with password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ color: 'blue', marginTop: 10 }}>Don't have an account? Sign up</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    label: { marginBottom: 8, fontSize: 16 },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        fontSize: 18,
        padding: 8
    },
    message: { textAlign: "center", marginTop: 20, color: "#d00" }
});
