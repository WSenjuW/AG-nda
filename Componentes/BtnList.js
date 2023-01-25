import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {View, TouchableOpacity } from 'react-native';


const BtnList = (props) => (
  <TouchableOpacity 
    onPress={()=>    props.menuData.menu === true ?  props.menuData.setMenu(false) : props.menuData.setMenu(true)}
  style={{
    backgroundColor: "#fff",
    width: 160,
    height: 100,
    position: 'absolute',
    right: -80,
    top: -30,
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }]
  }}>
  <View style={{ transform: [{ rotate: '-45deg' }], marginBottom: -40 }}>
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="bi bi-list"
    viewBox="2 0 5 20"
    width={50}
    height={50}
    
    fill="#000"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    />
  </Svg>
  </View>
</TouchableOpacity>



)

export default BtnList
