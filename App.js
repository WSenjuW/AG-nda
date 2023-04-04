import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, StatusBar, FlatList, SafeAreaView, Text } from 'react-native';
import { BtnMenu } from './Componentes/Btns';
import { BtnAddNewNote } from './Componentes/Btns';
import Menu from './Componentes/Menu';
import { ModalComponent } from './Componentes/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemDate from './Componentes/itemDate';
import { DataContext, InfoContext } from './Componentes/InfoContext';


export default function App() {
  const [modal, setModal] = useState(null);
  const [menu, setMenu] = useState(false);
  let info = useContext(DataContext);

  useEffect(() => {
    async function updateInfo() {
      let data = await AsyncStorage.getItem('info');
      if (data === null) {
        await AsyncStorage.setItem('info', JSON.stringify(info))
      } else {
        dispatchInfo({ type: "UPDATE_DATA", value: JSON.parse(data) })
      }
    }
  }, []);


  // tengo una idea que consiste en guardar los datos de notas como un array con objetos y
  // dentro de los objetos guardar el año y los datos.


  return (
    <InfoContext>
      <View style={{ ...styles.container, backgroundColor: info.background }}>
        {/* Barra de estado de android */}
        <StatusBar
          backgroundColor='#1f1f1f'
          hidden={false} />
        {/* botón de menu */}
        <BtnMenu menuData={{ menu, setMenu }} />
        {/* botón para agregar nota */}
        <BtnAddNewNote modalData={setModal} />
        {/* Caja con todas las notas actuales */}
        <SafeAreaView style={styles.scrollBox}>
          {
            info.notes.length === 0 ? <Text style={{ fontSize: 30, textAlign: 'center', marginTop: "40%" }}>Por ahora no tienes Notas.</Text>
              :
              <FlatList
                data={info.notes}
                renderItem={({ item }) => <ItemDate element={item} setModal={setModal} />}
                keyExtractor={item => item.year}
              />}
        </SafeAreaView>
        {/* Menu */}
        <Menu menuData={{ menu, setMenu }} />
        {/* Modal */}
        {modal !== null && <ModalComponent modal={{ modal, setModal }} />}
      </View >
    </InfoContext>
  );
}

const styles = StyleSheet.create({
  scrollBox: {
    flex: 1,
    width: '100%',
    height: 200,
    elevation: 10,
    paddingVertical: "6%"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  modal: {
    width: '90%',
    height: "70%",
    paddingVertical: 50,
    backgroundColor: '#f1f1f1',
    position: 'absolute',
    display: 'flex',
    alignContent: 'center',
    borderRadius: 10
  }
});
