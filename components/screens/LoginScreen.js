import React, {useState} from 'react';

import {StyleSheet, ScrollView, KeyboardAvoidingView, View} from 'react-native';

import Boton from '../general/Boton';
import Input from '../general/Input';
import Cargando from '../general/Cargando';
import MensajeAccion from '../general/MensajeAccion';
import ImagenPreview from '../general/ImagenPreview';
import AlertModal from '../general/AlertModal';

import {signIn} from '../../config/initAuthFire';

  export default function LoginScreen({navigation})
  {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [cambiaVista, setCambiarVista] = useState(false);

    const verificarUsuario = () => {
        setErrortext('');
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
        setLoading(true);

        signIn(userEmail, userPassword)
        .then((data) => {
          setLoading(false);
          if(data.code != undefined)
          {
            switch(data.code)
            {
              case 'auth/invalid-email':
                setErrortext('El email que ingresaste es invalido.') ;
                setShowModal(true);
              break;
              case 'auth/wrong-password':
                setErrortext('El password es incorrecto, verifica.') ;
                setShowModal(true);
              break;
              case 'auth/user-not-found':
                setErrortext('El usuario no ha sido encontrado, verifica.') ;
                setShowModal(true);
              break;
            }
          }
          else
          {
            if(data.user != undefined)
            {
              setCambiarVista(true);
              navigation.navigate({
                name: 'Inicio',
                params: { post: data.user.uid }
            });
            }
            else
            {
                setErrortext('No se pudo registrar correctamente al usuario, intente de nuevo.') ;
                setShowModal(true);
            }
          }
        })
        .catch((error) => {
            setErrortext('Error: ' + error.message) ;
            setShowModal(true);
            setLoading(false);
        });
    }

    return (
        <View style={styles.mainBody}>
          <Cargando loading={loading}  />
          <AlertModal modalVisible={showModal} setModalVisible={setShowModal} mensaje={errortext} />
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.contentContainerStyle}>
            <View>
              <KeyboardAvoidingView enabled>
                <ImagenPreview/>
                <Input onChangeText={setUserEmail} 
                    placeholderText="Ingresa Correo"
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
                <Boton onPressHandle={verificarUsuario} btnText="Ingresar..." /> 
                <MensajeAccion onPressHandle={() => navigation.navigate('Registro')} msjText="Registrate Ahora" /> 
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
      );
  }

  
const styles = StyleSheet.create({
    mainBody: {
      backgroundColor: '#926ED8',
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
    },
    contentContainerStyle:{
      width: 500 * 0.8,
      borderColor: '#FFFFFF',
      borderWidth: 2,
      borderRadius: 10,
    }
  });