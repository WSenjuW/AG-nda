import { useContext, } from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView, StatusBar } from 'react-native';
import { BtnMenu } from '../Btns';
import { BtnAddNewNote } from '../Btns';
import ItemDate from './itemDate';
import { DataContext } from '../Navigation_InfoContext/InfoContext';
import TodayItem from './todayItem';



const MsgLanguage = {
  es: 'No tienes notas por ahora.',
  en: "You don't have any notes saved."
}


export default function Home({ setModal, navigation }) {
  let { info } = useContext(DataContext);
  let { themeIndex,
    themeList,
    languageList,
    languageIndex,
    todayNotes } = useContext(DataContext).info;


  function createNewNote() {
    setModal(undefined);
    navigation.navigate('Modal');
  }

  return (
    <View style={{ ...styles.container, backgroundColor: (themeList[themeIndex].background) }}>
      <StatusBar barStyle={themeList[themeIndex].themeTitle == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={themeList[themeIndex].background} />
      <BtnMenu OP={navigation.toggleDrawer} />
      <BtnAddNewNote onPressEvent={createNewNote} />
      <SafeAreaView style={styles.scrollBox}>
        {
          Object.keys(info.notes).length === 0 && todayNotes.length === 0
          &&
          <Text style={{ ...styles.msg, color: themeList[themeIndex].textColor }}>{MsgLanguage[languageList[languageIndex]]}</Text>
        }
        {
          todayNotes.length !== 0
          &&
          <TodayItem setModal={setModal} navigation={navigation} />
        }
        {
          Object.keys(info.notes).length !== 0
          &&
          <FlatList
            data={Object.keys(info.notes)}
            renderItem={({ item }) => <ItemDate navigation={navigation} element={item} setModal={setModal} />}
            keyExtractor={(item, index) => index}
          />}
      </SafeAreaView>
    </View >
  )
}



const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: '100%',
    display: 'flex',
    justifyContent: "center"
  },
  scrollBox: {
    overflow: 'hidden',
    width: '100%',
    height: "90%",
    alignSelf: 'center',
  },
  msg: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: "40%",
    color: '#000'
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