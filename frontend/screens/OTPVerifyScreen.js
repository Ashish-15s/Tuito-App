// screens/OTPVerifyScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import {
    auth,
    PhoneAuthProvider,
    signInWithCredential
} from "../firebaseConfig";

export default function OTPVerifyScreen({ route, navigation }) {
    const { verificationId, phone } = route.params;
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    const verifyOTP = async () => {
        setMessage("");
        try {
            const credential = PhoneAuthProvider.credential(verificationId, code);
            await signInWithCredential(auth, credential);

        } catch (err) {
            setMessage("❌ " + err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Code sent to {phone}</Text>
            <TextInput
                style={styles.input}
                placeholder="123456"
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
            />
            <Button title="Verify Code" onPress={verifyOTP} disabled={code.length < 6} />
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    label: { marginBottom: 8, fontSize: 16, textAlign: "center" },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        fontSize: 18,
        padding: 8,
        textAlign: "center"
    },
    message: { textAlign: "center", marginTop: 20, color: "#d00" }
});
