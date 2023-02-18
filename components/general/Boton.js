import {StyleSheet, Text, TouchableOpacity} from 'react-native';


export default function Boton({onPressHandle, btnText}){

    return (
        <TouchableOpacity 
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={onPressHandle}>
            <Text style={styles.buttonTextStyle}>{btnText}</Text>
        </TouchableOpacity>
    );
  }


  
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    }
});