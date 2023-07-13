import { useContext, } from 'react';
import { StyleSheet, View, Text, StatusBar, ScrollView } from 'react-native';
import { BtnMenu } from '../Btns';
import { BtnAddNewNote } from '../Btns';
import { DataContext } from '../Navigation_InfoContext/InfoContext';
import { NotesItems } from './NotesItemsList';
import { HOME_MSG } from '../StaticText.json';

export default function Home({ setModal, navigation }) {
  let { themeIndex,
    themeList,
    languageList,
    languageIndex,
    todayNotes,
    notes
  } = useContext(DataContext).info;

  function createNewNote() {
    setModal(undefined);
    navigation.navigate('Modal');
  }

  return (
    <View style={{ ...styles.container, backgroundColor: (themeList[themeIndex].background) }}>
      <StatusBar barStyle={
        themeList[themeIndex].typeTheme == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={themeList[themeIndex].background} />
      <BtnMenu OP={navigation.toggleDrawer} />
      <BtnAddNewNote onPressEvent={createNewNote} />
      <ScrollView style={styles.scrollBox}>
        {
          Object.keys(notes).length === 0 && todayNotes.length === 0
            ?
            <Text style={{ ...styles.msg, color: themeList[themeIndex].textColor }}>{HOME_MSG[languageList[languageIndex]]}</Text>
            :
            <NotesItems navigation={navigation} setModal={setModal} />
        }
      </ScrollView>
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
    overflow: 'scroll',
    width: '94%',
    maxHeight: "94%",
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