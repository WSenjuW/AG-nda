import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { DataContext } from "./InfoContext";


export default function Menu({ SSM, SM }) {
    const { dispatch, info } = useContext(DataContext);
    const { themeList, themeIndex } = useContext(DataContext).info;


    return (
        <View style={{ ...styles.menuBox, backgroundColor: themeList[themeIndex].menuBackground }}>
            <TouchableOpacity style={{
                ...styles.menuItem,
                borderColor: themeList[themeIndex].menuItemColor
            }}
                onPress={() => {
                    dispatch({ type: "CHANGE_THEME" });
                    SSM(!SM)
                }}
            >
                <Text style={{
                    ...styles.menuItemText,
                    backgroundColor: (themeList[themeIndex].menuItemBackground),
                    color: themeList[themeIndex].menuItemColor
                }}
                >Tema {themeList[themeIndex].themeTitle[0].toUpperCase() + themeList[themeIndex].themeTitle.substring(1)}</Text>
            </TouchableOpacity>
            <Text style={{ ...styles.infoDeveloped, color: themeList[themeIndex].menuItemColor }}>Developed by WSenjuW</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    infoDeveloped: {
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        fontSize: 16
    },
    menuBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 50,
        overflow: 'hidden'
    },
    menuBlur: {
        width: '30%',
        height: '100%'
    },
    zoneBlur: {
        width: '100%',
        height: '100%',

    },
    menuItem: {
        width: "92%",
        height: 60,
        alignSelf: 'center',
        borderLeftWidth: 4,
        marginBottom: 30,
    },
    menuItemText: {
        width: '100%',
        minWidth: 200,
        height: "100%",
        textAlignVertical: 'center',
        fontSize: 18,
        paddingLeft: 8,
        letterSpacing: 2,
    },
});