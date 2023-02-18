import {StyleSheet,TextInput,View} from 'react-native';

  export default function Input({placeholderText, onChangeText, keyboardType, secureText, blur, placeholderColor = "#fff", value = "", editable = true }){


    return (
        <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                defaultValue={value}
                onChangeText={onChangeText}
                placeholder={placeholderText}
                keyboardType={keyboardType}
                blurOnSubmit={blur}
                secureTextEntry={secureText}
                placeholderTextColor={placeholderColor}
                editable={editable}
                selectTextOnFocus={editable}
                returnKeyType="next"
              />
        </View>
    );
  }


  
const styles = StyleSheet.create({
    sectionStyle: {
      flexDirection: 'row',
      height: 50,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 2,
      borderRadius: 30,
      borderColor: '#dadae8',
    }
  });