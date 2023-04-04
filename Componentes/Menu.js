import { BlurView } from "expo-blur";
import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { DataContext } from "../App";


export default function Menu(props) {
    const { dispatch, info } = useContext(DataContext);

    return (
        <BlurView
            intensity={100}
            tint="dark"
            style={{ ...styles.boxMenuBlur, width: (props.menuData.menu ? "100%" : 0) }}
        >
            <View style={info.theme == 'light' ? styles.menuBoxLight : styles.menuBoxDark}>
                <TouchableOpacity style={info.theme == 'light' ? styles.menuItemLight : styles.menuItemDark}
                    onPress={() => dispatch({
                        type: "CHANGE_THEME",
                        value: (info.theme === 'light' ? 'dark' : 'light')
                    })}
                >
                    <Text style={info.theme == 'light' ? styles.menuItemTextLight : styles.menuItemTextDark}>Tema {info.theme[0].toUpperCase() + info.theme.substring(1)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={info.theme == 'light' ? styles.menuItemLight : styles.menuItemDark}
                >
                    <Text style={info.theme == 'light' ? styles.menuItemTextLight : styles.menuItemTextDark}>Color de Fondo</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => props.menuData.menu === true ? props.menuData.setMenu(false) : props.menuData.setModal(false)}
                style={styles.zoneBlur}
            />
        </BlurView>
    )
}


const styles = StyleSheet.create({

    boxMenuBlur: {
        position: 'absolute',
        width: '100%',
        height: "100%",
        zIndex: 101,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        left: 0,
        top: 0
    },
    menuBoxLight: {
        backgroundColor: '#f1f1f1',
        width: '70%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 50
    },
    menuBoxDark: {
        backgroundColor: '#1f1f1f',
        width: '70%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 50
    },
    zoneBlur: {
        width: '30%',
        height: '100%'

    },
    menuItemLight: {
        backgroundColor: '#DDDDDD',
        width: "92%",
        height: 60,
        alignSelf: 'center',
        borderLeftWidth: 4,
        marginBottom: 30
    },
    menuItemDark: {
        backgroundColor: '#3d3d3d',
        width: "92%",
        height: 60,
        alignSelf: 'center',
        borderLeftWidth: 4,
        marginBottom: 30,
        borderLeftColor: '#ffffff',
    },
    infoDeveloped: {
        bottom: 0,
        width: "100%",
        textAlign: 'center'
    },
    menuItemTextLight: {
        width: '100%',
        height: "100%",
        textAlignVertical: 'center',
        fontSize: 18,
        paddingLeft: 8,
        letterSpacing: 2,
    },
    menuItemTextDark: {
        width: '100%',
        height: "100%",
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 18,
        paddingLeft: 8,
        letterSpacing: 2,
    },
});