import { useState, useContext, useRef } from 'react';
import { StyleSheet, View, StatusBar, FlatList, SafeAreaView, Text, DrawerLayoutAndroid } from 'react-native';
import { BtnMenu } from './Btns';
import { BtnAddNewNote } from './Btns';
import Menu from './Menu';
import { ModalComponent } from './modal';
import ItemDate from './itemDate';
import { DataContext } from './InfoContext';


export function Principal(props) {
  const [modal, setModal] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  let { info } = useContext(DataContext);
  let { themeIndex, themeList } = useContext(DataContext).info;
  const drawerRef = useRef(null);

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition='left'
      renderNavigationView={() => <Menu SSM={setShowMenu} SM={showMenu} />}
    >
      <View style={{ ...styles.container, backgroundColor: (themeList[themeIndex].background) }}>
        <StatusBar backgroundColor='#1f1f1f' hidden={false} />
        <BtnMenu OP={drawerRef} />
        <BtnAddNewNote modalData={setModal} />
        <SafeAreaView style={styles.scrollBox}>
          {
            info.notes.length === 0
              ?
              <Text style={{ ...styles.msg, color: themeList[themeIndex].textColor }}>Por ahora no tienes Notas.</Text>
              :
              <FlatList
                data={info.notes}
                renderItem={({ item }) => <ItemDate element={item} setModal={setModal} />}
                keyExtractor={item => item.year}
              />}
        </SafeAreaView>
        {modal !== null && <ModalComponent modal={{ modal, setModal }} />}
      </View >
    </DrawerLayoutAndroid>
  )
}

const styles = StyleSheet.create({
  msg: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: "40%",
    color: '#000'
  },
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