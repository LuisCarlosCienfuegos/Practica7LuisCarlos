import React, {useState, useEffect} from 'react';

import {StyleSheet, ScrollView, KeyboardAvoidingView, View} from 'react-native';

import Boton from '../general/Boton';
import Input from '../general/Input';
import Cargando from '../general/Cargando';
import ImagenPreview from '../general/ImagenPreview';
import AlertModal from '../general/AlertModal';

import {createAt} from '../../config/initAuthFire';
import { database, ref, child, set, get } from '../../config/initDataBase';


export default function EditScreen({navigation, route}) 
{
  const { uid } = route.params;
  const [userData, setUserData] = useState({});

  const [name, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userAge, setAge] = useState('');
  const [userGender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const dbRef = ref(database);
      get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val()
          setUserName(data?.name)
          setLastName(data?.lastName)
          setAge(data?.age)
          setGender(data?.gender)
          setPhoneNumber(data?.phoneNumber)
          setUserData(data)
        } else {
          console.log("No data available");
          navigation.navigate('Login');
        }
      }).catch((error) => {
        console.error(error);
        navigation.navigate('Login');
      });
    })();
  }, []);


    const modificarUsuario = () => {
        setErrortext('');

        if (!name) {
          setErrortext('Debes ingresar tu(s) nombre(s) completo(s)');
          setShowModal(true);
          return;
        }
        if (!lastName) {
            setErrortext('Debes ingresar al menos un Apellido');
            setShowModal(true);
          return;
        }

        setLoading(true);

        set(ref(database, "users/" + uid), {
          userEmail: userData.userEmail,
          name: name,
          lastName: lastName,
          age: userAge,
          gender: userGender,
          phoneNumber: phoneNumber
        }).then((dt) => {
          setErrortext('registro modificado exitosamente!') ;
          setShowModal(true);
          setLoading(false);

        })
        .catch((error) => {
          setLoading(false);
          setErrortext('Error: ' + error.message) ;
          setShowModal(true);
      });

    }

    return (
        <View style={styles.mainBody}>
        <Cargando loading={loading} />
        <AlertModal modalVisible={showModal} setModalVisible={setShowModal} mensaje={errortext}/>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.contentContainerStyle}>
            <View>
              <KeyboardAvoidingView >
                <ImagenPreview imagenSelccionada={require("../../Imagenes/411.jpeg")} />
                <Input 
                    keyboardType="emailAddress"
                    blur={false}
                    secureText={false}
                    placeholderColor="#030303"
                    editable={false}
                    value={userData?.userEmail}
                />
                <Input onChangeText={setUserName} 
                    placeholderText="Ingresa Nombre(s)"
                    keyboardType="name"
                    blur={false}
                    secureText={false}
                    placeholderColor="#030303"
                    value={userData?.name}
                />
                <Input onChangeText={setLastName} 
                    placeholderText="Ingresa Apellido(s)"
                    keyboardType="familyName"
                    blur={false}
                    secureText={false}
                    placeholderColor="#030303"
                    value={userData?.lastName}
                />
                <Input onChangeText={setAge} 
                    placeholderText="Ingresa Edad"
                    keyboardType="number"
                    blur={false}
                    secureText={false}
                    placeholderColor="#030303"
                    value={userData?.age}
                />
                <Input onChangeText={setGender} 
                    placeholderText="Ingresa Genero"
                    keyboardType="default"
                    blur={false}
                    secureText={false}
                    placeholderColor="#030303"
                    value={userData?.gender}
                />
                 <Input onChangeText={setPhoneNumber} 
                    placeholderText="Ingresa Numero Telefonico"
                    keyboardType="telephoneNumber"
                    blur={false}
                    secureText={false}
                    placeholderColor="#030303"
                    value={userData?.phoneNumber}
                />
                <Boton onPressHandle={modificarUsuario} btnText="Modificar..." /> 
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
      );
  }

  
const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      backgroundColor: '#926ED8',
      alignItems: "center", 
      justifyContent: "center", 
      flexDirection: "row",
    },
    contentContainerStyle:{
        backgroundColor: '#D2D1D1',
      width: 500 * 0.8,
      borderColor: '#FFFFFF',
      borderWidth: 2,
      borderRadius: 10,
    }
  });

  