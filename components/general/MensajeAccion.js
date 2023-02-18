import {StyleSheet, Text} from 'react-native';


export default function MensajeAccion({msjText, onPressHandle}){

    return (
      <Text
        style={styles.registerTextStyle}
        onPress={onPressHandle}>
        {msjText}
      </Text>
    );
  }


  
const styles = StyleSheet.create({
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
});