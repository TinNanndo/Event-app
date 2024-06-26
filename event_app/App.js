import { StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/loginscreen";
import HomeScreen from "./screens/homescreen";
import RegisterScreen from "./screens/registerscreen";
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./services/config";

export default function App() {
  const Stack = createNativeStackNavigator();
  const auth = getAuth(app);
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  // Handle user state changes
  const onAuthStateChangedHandler = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
      // screenOptions={{ headerShown: false }}
      >
        {user? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
         <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
         </>
         )}             
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});