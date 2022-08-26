import React, { useState } from "react";
import { Text, View , StyleSheet} from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/core";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const signIn = async () => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {!!error && (
        <Subheading
          style={{ color: "red", textAlign: "center", marginBottom: 16 }}
        >
          {error}
        </Subheading>
      )}
      <TextInput
        label="Email"
        style={{ marginTop: 12 }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        style={{ marginTop: 12 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View
        style={styles.buttonContainer}
      >
        <Button 
        compact 
        onPress={() => navigation.navigate("SignUp")}
        style={styles.in}
        >
          Sign Up
        </Button>
        <Button 
        mode="contained" 
        onPress={() => signIn()} loading={isLoading}
        style={styles.up}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,

  },

  name: {
    marginTop: 12,
  },

  email: {
    marginTop: 12,
  },

  password: {
    marginTop: 12,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  in: {
    marginTop: 16,
  },

  up: {
    marginTop: 16,
  }
})

export default SignIn;