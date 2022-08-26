import { StyleSheet, Text, View } from 'react-native'
import { React, useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-native-paper';
import ChatList from './screens/ChatList';
import Chat from './screens/Chat';
import Settings from './screens/Settings';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Ionicons } from "@expo/vector-icons";

const firebaseConfig = {
  apiKey: "AIzaSyAQW5vSWNcf-DdDkFJoVUcyROUPGjFAgRU",
  authDomain: "chat-app-83de8.firebaseapp.com",
  projectId: "chat-app-83de8",
  storageBucket: "chat-app-83de8.appspot.com",
  messagingSenderId: "864617404445",
  appId: "1:864617404445:web:15efa1b75ba545310c4ef4"
};
firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();



const TabsNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate("SignUp");
      }
    });
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={route.name === "ChatList" ? "chatbubbles" : "settings"}
              color={color}
              size={size}
              focused={focused}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ presentation: "fullScreenModal" }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};




export default App

const styles = StyleSheet.create({})