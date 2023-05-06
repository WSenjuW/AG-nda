import * as React from "react"
import { useContext } from "react"
import Svg, { Path } from "react-native-svg"
import { View, TouchableOpacity } from 'react-native';
import { DataContext } from "./InfoContext";




function BtnMenu({ OP }) {
  let { themeList, themeIndex } = useContext(DataContext).info;

  return (<TouchableOpacity
    onPress={() => OP.current.openDrawer() }
    style={{
      backgroundColor: (themeList[themeIndex].btnBackground),
      width: 90,
      height: 90,
      borderRadius: 100,
      position: 'absolute',
      right: -30,
      top: -30,
      display: 'flex',
      zIndex: 50,
    }}>
    <View
      style={{
        position: 'absolute',
        bottom: 22
      }}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="bi bi-list"
        viewBox="0 -9 12 22"
        width={60}
        height={60}
        fill={themeList[themeIndex].textColor}
      >
        <Path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </Svg>
    </View>
  </TouchableOpacity>)
}

const BtnAddNoteModal = (props) => {

  return (
    <TouchableOpacity
      style={{
        width: '35%',
        height: 60,
        backgroundColor: (!props.showModal ? '#26a657' : "#639175"),
        borderRadius: 5,
        alignSelf: 'center',
      }}
      disabled={props.showModal}
      onPress={props.SI}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-8 1 32 7"
        width={70}
        height={60} 
        fill="#000"
        className="bi bi-journal-plus"
        alignSelf="center"
         >
        <Path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
        <Path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
        <Path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
      </Svg>
    </TouchableOpacity>
  )
}

const BtnRemoveNoteModal = (props) => {

  return (
    <TouchableOpacity
      onPress={props.RI}
      style={{
        width: '35%',
        height: 60,
        backgroundColor: '#e63939',
        borderRadius: 5,
        alignSelf: 'center',
      }}
    >
      <Svg
        viewBox="-8 1 32 7"
        xmlns="http://www.w3.org/2000/svg"
        width={70}
        height={60}
        fill="#000"
        className="bi bi-journal-minus"
        alignSelf="center"
      >
        <Path
          fillRule="evenodd"
          d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
        />
        <Path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
        <Path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
      </Svg>
    </TouchableOpacity>
  )

}


function BtnAddNewNote(props) {
  let { themeList, themeIndex } = useContext(DataContext).info;

  return (
    <TouchableOpacity
      onPress={() => props.modalData(undefined)}

      style={{
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: 30,
        right: 30,
        zIndex: 50,
        backgroundColor: (themeList[themeIndex].btnBackground),
        borderRadius: 100,
      }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="bi bi-journal-plus"
        viewBox="-8 0.3 32 10"
        width={70}
        height={60}
        fill={themeList[themeIndex].textColor}
        {...props}
      >
        <Path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
        <Path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
        <Path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
      </Svg>
    </TouchableOpacity>

  )

}

export { BtnMenu, BtnAddNewNote, BtnAddNoteModal, BtnRemoveNoteModal };