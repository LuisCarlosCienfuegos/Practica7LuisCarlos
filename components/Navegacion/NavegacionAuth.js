
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import "react-native-gesture-handler"; 

import InicioScreen from '../screens/InicioScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';

const Stack = createNativeStackNavigator();

export default function NavegacionAuth() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}   />
        <Stack.Screen name="Registro" component={RegistroScreen}  />
        <Stack.Screen name="Inicio" component={InicioScreen} options={{headerShown: false}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



