import { ScrollView, Image, Text, TextInput, TouchableOpacity, View, } from "react-native";
import React, { useState } from "react";
import { signup } from "../services/auth";
import styles from "../cssStyles/commonStyles";
import {useNavigation} from "@react-navigation/native";
import { saveUserData } from "../services/firebaseDatabase";
import Loader from "../services/loading Indicator";

const RegisterScreen = () => {
    const [email, setEmail] = useState("test@gmail.com"); 
    const [password, setPassword] = useState("123456"); 
    const [firstname, setFirstname] = useState("a"); 
    const [lastname, setLastname] = useState("b"); 
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleSignup = async () => {
        setLoading(true);
        
        try {
            const user = await signup(email, password);
            
            if (user) {
                const id = user.uid;
                await saveUserData(id, firstname, lastname);
        }
    } catch (error) {
        setLoading(false);
        if(error.code === "auth/email-already-in-use") {
            alert("Email already in use");
        } else if (error.code === "auth/weak-password") {
            alert("Password should be at least 6 characters");
        } else {
            alert("Something went wrong" + error.message);
        }
    }
};

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                //<Image source={require("../assets/logo.png")} style={styles.logo} />

                <Text style={styles.title}>Register</Text>

                <TextInput style={styles.input} placeholder="First Name" autoCapitalize="none" value={firstname} onChangeText={setFirstname} />
                <TextInput style={styles.input} placeholder="Last Name" autoCapitalize="none" value={lastname} onChangeText={setLastname} />
                <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} autoCapitalize="none" value={password} onChangeText={setPassword} />

                {loading ? (<Loader />) : (<TouchableOpacity style={styles.button} onPress={handleSignup}> <Text style={styles.buttonText}>Register</Text> </TouchableOpacity>)} 
                <TouchableOpacity onPress={handleLogin}> <Text style={styles.title5}>Already have an account? Login here.</Text> </TouchableOpacity>
                </View>
            </View>
        </ScrollView>    
    );
};

export default RegisterScreen;