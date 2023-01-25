import { useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, TouchableOpacity, Text } from 'react-native';
import BtnList from './Componentes/BtnList';
import BtnListPlus from './Componentes/BtnListPlus';

export default function App() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);

  console.log(new Date);


  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <BtnList menuData={{ menu, setMenu }} />
      <BtnListPlus modalData={{ modal, setModal }} />
      <ScrollView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => menu === true ? setMenu(false) : setModal(false)}
        style={{ ...styles.darkBackground, width: (menu === true || modal === true ? "100%" : 0) }} />
      {modal === true &&
        <View style={styles.modal}>
          <Text style={{
            alignSelf: 'center'
            , fontSize: 20, maxWidth: 200, textAlign: 'center'
          }} >Fecha actual</Text>


        </View>
      }
      <ScrollView
        style={{ ...styles.Menu, width: (menu ? "70%" : 0) }}
      >
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Modo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A3869',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  darkBackground: {
    width: '100%',
    height: "100%",
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#00000090',
  },
  Menu: {
    height: '100%',
    backgroundColor: '#f1f1f1',
    position: 'absolute',
    left: 0,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  menuItem: {
    width: "92%",
    height: 60,
    backgroundColor: "#D9D9D9",
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: '4%',
    margin: 10
  },
  menuItemText: {
    fontSize: 18,
    maxWidth: 200,
    marginLeft: 10
  },
  modal: {
    width: '90%',
    height: "70%",
    paddingVertical:50,
    backgroundColor: '#f1f1f1',
    position: 'absolute',
    display: 'flex',
    alignContent: 'center',
  }
});
