import { StyleSheet, Image, View } from "react-native";

export default function ImagenPreview({ imagenSelccionada  }) {
  const source = imagenSelccionada !=undefined ?  imagenSelccionada : require("../../Imagenes/157.jpeg");
  return ( 
        <View style={{alignItems: 'center'}}> 
            <Image source={source} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    margin: 30,
    borderRadius:100,
    borderColor: '#FFFFFF',
    borderWidth: 5
  },
});
