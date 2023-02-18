import { StyleSheet, Text, SafeAreaView } from 'react-native';

import NavegacionAuth from './components/Navegacion/NavegacionAuth';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavegacionAuth />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#926ED8',
    
  },
});
