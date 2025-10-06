import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';

const Stack = createStackNavigator();

const theme = createTheme({
  lightColors: {
    primary: '#4CAF50',
    secondary: '#FFC107',
  },
  darkColors: {
    primary: '#4CAF50',
  },
  components: {
    Button: {
      raised: false,
    },
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }} 
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ 
                title: 'Minhas Despesas',
                headerLeft: null, 
                gestureEnabled: false, 
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}