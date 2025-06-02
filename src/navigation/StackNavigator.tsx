import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CadastroPrestadorLocalScreen from '../screens/CadastroPrestadorLocalScreen';
import PrestadorDetalhesScreen from '../screens/PrestadorDetalhesScreen'; // ✅ nova importação
import EscolherPlanoScreen from '../screens/EscolherPlanoScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  CadastroPrestadorLocalScreen: undefined;
  PrestadorDetalhesScreen: any; // ✅ temporariamente sem tipagem rígida
  EscolherPlanoScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastroPrestadorLocalScreen" component={CadastroPrestadorLocalScreen} />
        <Stack.Screen name="PrestadorDetalhesScreen" component={PrestadorDetalhesScreen} />
        <Stack.Screen name="EscolherPlanoScreen" component={EscolherPlanoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


