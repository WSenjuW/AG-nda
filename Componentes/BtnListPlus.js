import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { TouchableOpacity } from 'react-native';


const BtnListPlus = (props) => (
  <TouchableOpacity 
    onPress={()=> props.modalData.modal === false ? props.modalData.setModal(true) : props.modalData.setModal(false)}
  
  style={{
    width: 45,
    height: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
  }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="bi bi-journal-plus"
      viewBox="0 2 25 7"
      width={70}
      height={60}
      fill="#fff"
      {...props}
    >
      <Path
        fillRule="evenodd"
        d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
      />
      <Path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
      <Path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
    </Svg>
  </TouchableOpacity>

)

export default BtnListPlus
