import { StyleSheet, Text, SafeAreaView } from 'react-native';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from "@react-navigation/drawer";


import HomeScreen from './HomeScreen';
import LogoutScreen from './LogoutScreen';
import EditScreen from './EditScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function InicioScreen({navigation, route}) {

  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Navigator initialRouteName="Principal">
          <Stack.Screen name="Principal" component={HomeScreen} initialParams={{ uid: route.params?.post }} />
          <Stack.Screen name="Editar Info" component={EditScreen} initialParams={{ uid: route.params?.post }}  />
          <Stack.Screen name="Salir" component={LogoutScreen}  />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#926ED8',
  },
});


