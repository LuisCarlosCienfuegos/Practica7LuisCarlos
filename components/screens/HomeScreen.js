import { useEffect, useState } from "react";

import { StyleSheet, ScrollView, KeyboardAvoidingView, SafeAreaView, Text } from 'react-native';

import ImagenPreview from '../general/ImagenPreview';
import { database, ref, child, get, onValue } from '../../config/initDataBase';


export default function HomeScreen({navigation, route}) {
  
  const { uid } = route.params;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      const starCountRef = ref(database, `users/${uid}`);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setUserData(snapshot.val())
        } else {
          console.log("No data available");
          navigation.navigate('Login');
        }
      })
    })();
  }, []);


  return (
      <SafeAreaView style={styles.mainBody}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.contentContainerStyle}>
            <KeyboardAvoidingView enabled>
                <ImagenPreview imagenSelccionada={require("../../Imagenes/249.jpeg")} />
                <Text style={styles.textBienvenida}>Bienvenido: { (userData?.name+' '+userData?.lastName)}</Text>
            </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
  );
}


  
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#926ED8',
    flexDirection: "row",
  },
  contentContainerStyle:{
    backgroundColor: '#D1D1D1',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 10,
  },
  textBienvenida:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
