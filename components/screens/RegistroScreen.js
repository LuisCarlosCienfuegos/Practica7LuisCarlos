import React, {useState} from 'react';

import {StyleSheet, ScrollView, KeyboardAvoidingView, View} from 'react-native';

import Boton from '../general/Boton';
import Input from '../general/Input';
import Cargando from '../general/Cargando';
import MensajeAccion from '../general/MensajeAccion';
import ImagenPreview from '../general/ImagenPreview';
import AlertModal from '../general/AlertModal';

import {createAt} from '../../config/initAuthFire';
import { database, ref, set } from '../../config/initDataBase';

  export default function RegistroScreen({navigation})
  {
    const [userEmail, setUserEmail] = useState('');
    const [userEmailDos, setUserEmailDos] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordDos, setUserPasswordDos] = useState('');
    const [name, setUserName] = useState('');
    const [lastName, setLastName] = useState('');

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [cambiaVista, setCambiarVista] = useState(false);

    const verificarUsuario = () => {
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
        if (!userEmail) {
            setErrortext('Debes ingresar un Correo');
            setShowModal(true);
          return;
        }
        if (!userPassword) {
            setErrortext('Debes ingresar el Password');
            setShowModal(true);
          return;
        }
        if (userEmail != userEmailDos) {
            setErrortext('Los correos deben coincidir');
            setShowModal(true);
          return;
        }
        if(userPassword != userPasswordDos){
            setErrortext('Las contrasenas deben coincidir');
            setShowModal(true);
          return;
        }

        setLoading(true);

        createAt(userEmail, userPassword)
        .then((data) => {
            if(data.code != undefined)
            {
              switch(data.code)
              {
                case 'auth/invalid-email':
                  setErrortext('El email que ingresaste es invalido.') ;
                  setShowModal(true);
                break;
                case 'auth/weak-password':
                  setErrortext('El password debe contener un minimo de 6 digitos.') ;
                  setShowModal(true);
                break;
                case 'auth/email-already-in-use':
                  setErrortext('El correo ingresado ya se encuentra en uso.') ;
                  setShowModal(true);
                break;
              }
            }
            else
            {
              if(data.user != undefined)
              {
                set(ref(database, "users/" + data.user.uid), {
                  userEmail: userEmail,
                  name: name,
                  lastName: lastName
                }).then((dt) => {
                  setErrortext('registro generado exitosamente!') ;
                  setShowModal(true);
                  setLoading(false);
                  setCambiarVista(true)
                })
                .catch((error) => console.log(error));
              }else
              {
                  setErrortext('No se pudo registrar correctamente al usuario, intente de nuevo.') ;
                  setShowModal(true);
              }
            }
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
          <AlertModal modalVisible={showModal} setModalVisible={setShowModal} mensaje={errortext} cambiarVista={cambiaVista} />
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.contentContainerStyle}>
            <View>
              <KeyboardAvoidingView >
                <ImagenPreview imagenSelccionada={require("../../Imagenes/411.jpeg")} />
                <Input onChangeText={setUserName} 
                    placeholderText="Ingresa Nombre(s)"
                    keyboardType="name"
                    blur={false}
                    secureText={false}
                />
                <Input onChangeText={setLastName} 
                    placeholderText="Ingresa Apellidos"
                    keyboardType="familyName"
                    blur={false}
                    secureText={false}
                />
                <Input onChangeText={setUserEmail} 
                    placeholderText="Ingresa Correo"
                    keyboardType="emailAddress"
                    blur={false}
                    secureText={false}
                />
                <Input onChangeText={setUserEmailDos} 
                    placeholderText="Valida Correo"
                    keyboardType="emailAddress"
                    blur={false}
                    secureText={false}
                />
                <Input onChangeText={setUserPassword} 
                    placeholderText="Ingresa Contrasena"
                    keyboardType="password"
                    blur={false}
                    secureText={true}
                />
                <Input onChangeText={setUserPasswordDos} 
                    placeholderText="Valida Contrasena"
                    keyboardType="password"
                    blur={false}
                    secureText={true}
                />
                <Boton onPressHandle={verificarUsuario} btnText="Registrar..." /> 
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
      width: 500 * 0.8,
      borderColor: '#FFFFFF',
      borderWidth: 2,
      borderRadius: 10,
    }
  });