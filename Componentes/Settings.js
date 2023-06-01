import { useContext, useRef } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Animated, FlatList, touchab, StatusBar } from "react-native"
import { DataContext } from "./Navigation_InfoContext/InfoContext"


const languageVar = {
    theme: {
        es: "Tema",
        en: "Theme"
    },
    language: {
        es: 'Idioma',
        en: 'Language'
    },
    idioma: {
        es: 'Español',
        en: 'English'
    }
};

export default function Settings(params) {
    const { themeList, themeIndex, languageList, languageIndex } = useContext(DataContext).info;
    const { dispatch } = useContext(DataContext);
    const heightRef1 = useRef(new Animated.Value(0)).current;
    const heightRef2 = useRef(new Animated.Value(0)).current;

    const animatedTheme = () => {
        Animated.timing(heightRef1, {
            toValue: (heightRef1._value == 0 ? 1 : 0),
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    const animatedLanguage = () => {
        Animated.timing(heightRef2, {
            toValue: (heightRef2._value == 0 ? 1 : 0),
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    const themeMaxHeight = (themeList.length * 60) + 66;
    const languageMaxHeight = (themeList.length * 60) + 66;

    return (
        <View style={{ ...styles.Background, backgroundColor: themeList[themeIndex].background }}>
            <StatusBar
                barStyle={themeList[themeIndex].typeTheme == 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={themeList[themeIndex].btnBackground}
            />
            <Animated.View style={{
                ...styles.AnimatedView,
                height: heightRef1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [62, themeMaxHeight]
                })
            }}>
                <TouchableOpacity
                    onPress={() => animatedTheme()}

                    style={{ ...styles.btnBox, borderColor: themeList[themeIndex].textColor }}>
                    <Text
                        style={{
                            ...styles.textItem,
                            backgroundColor: (themeList[themeIndex].btnBackground),
                            color: themeList[themeIndex].textColor
                        }} >
                        {languageVar.theme[languageList[languageIndex]] + ' ' + themeList[themeIndex].themeTitle[0].toUpperCase() + themeList[themeIndex].themeTitle.substring(1)}
                    </Text>
                </TouchableOpacity>
                <FlatList
                    data={themeList}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch({ type: "CHANGE_THEME", item: index }),
                                    animatedTheme();
                            }}
                            style={{ ...styles.TOOption, backgroundColor: (themeList[themeIndex].btnBackground), }}  >
                            <Text
                                style={{ ...styles.TOOptionText, color: themeList[themeIndex].textColor }}
                            >{item.themeTitle[0].toUpperCase() + item.themeTitle.substring(1)}</Text>
                        </TouchableOpacity>}
                    keyExtractor={(item, i) => i}
                />
            </Animated.View>
            <Animated.View style={{
                ...styles.AnimatedView,
                height: heightRef2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [62, languageMaxHeight]
                })
            }}>
                <TouchableOpacity
                    onPress={() => animatedLanguage()}

                    style={{
                        ...styles.btnBox,
                        borderColor: themeList[themeIndex].textColor
                    }}>
                    <Text style={{
                        ...styles.textItem,
                        backgroundColor: (themeList[themeIndex].btnBackground),
                        color: themeList[themeIndex].textColor
                    }} >
                        {languageVar.language[languageList[languageIndex]] + ' ' + languageVar.idioma[languageList[languageIndex]]}
                    </Text>
                </TouchableOpacity>
                <FlatList
                    data={languageList}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch({ type: "CHANGE_LANGUAGE", item: index }),
                                    animatedLanguage()
                            }}
                            style={{ ...styles.TOOption, backgroundColor: (themeList[themeIndex].btnBackground), }}  >
                            <Text
                                style={{ ...styles.TOOptionText, color: themeList[themeIndex].textColor }}
                            >{languageVar.idioma[item]}</Text>
                        </TouchableOpacity>}
                    keyExtractor={(item, i) => i}
                />
            </Animated.View>
        </View>
    )
}



const styles = StyleSheet.create({
    AnimatedView: {
        width: '92%',
        alignSelf: "center",
        height: 'auto',
        borderRadius: 10,
        overflow: 'hidden',
        display: "flex",
        flexDirection: "column",
        alignContent: 'center',
        marginVertical: 10,
    },
    TOOption: {
        width: '100%',
        height: 60,
        marginVertical: 1
    },
    TOOptionText: {
        width: '100%',
        height: '100%',
        textAlignVertical: 'center',
        fontSize: 20,
        paddingLeft: 40,
        letterSpacing: 3,
    },
    Background: {
        width: '100%',
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 20
    },
    btnBox: {
        borderLeftWidth: 5,
        width: '100%',
        height: 60,
        overflow: 'hidden',
        marginBottom: 1
    },
    textItem: {
        width: '100%',
        height: 60,
        textAlignVertical: 'center',
        fontSize: 20,
        letterSpacing: 2,
        paddingLeft: 14,
    }
})