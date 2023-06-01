import { Animated, View, StyleSheet, TouchableOpacity, Text, Dimensions, FlatList } from "react-native";
import { useContext, useState, useRef } from "react";
import { DataContext } from "../Navigation_InfoContext/InfoContext";
import { LinearGradient } from "expo-linear-gradient";
import { v4 as uuidv4 } from 'uuid';

const titleDelete = {
    es: 'Eliminar',
    en: 'Delete'
}

let today = {
    es: "Hoy",
    en: "Today"
}

export default function TodayItem({ navigation, setModal }) {
    let { languageList, languageIndex, todayNotes } = useContext(DataContext).info;

    return (
        <View style={styles.todayView}>
            <LinearGradient
                colors={['#ed3939', 'transparent']}
                style={{ width: '60%', height: 30 }}
                start={[.2, 0]}
                end={[.9, 0]}
            >
                <Text style={{ ...styles.textTodayView, color: "#fff" }}
                >{today[languageList[languageIndex]] + " - " + new Date().getFullYear()}</Text>
            </LinearGradient>
            <FlatList
                data={todayNotes}
                renderItem={({ item }) => <TodayItemList navigation={navigation} element={item} SM={setModal} />}
                keyExtractor={(element) => uuidv4()}
            />
        </View>
    )
}



function TodayItemList({ navigation, element, SM }) {
    const [opacityValue, setOpacityValue] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    let { dispatch } = useContext(DataContext);
    let { themeList, themeIndex, languageIndex, languageList } = useContext(DataContext).info;
    const opacitySVBox = useRef(new Animated.Value(1)).current;

    function animationSVBox() {
        Animated.timing(opacitySVBox, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }).start(({ finished }) => { dispatch({ type: "REMOVE_NOTE", item: element }) })
    }

    function calculandoOpacity(e) {
        if (e > maxScroll) setMaxScroll(e);
        else {
            let VALUE = Math.round((e * 100) / maxScroll) / 100;
            setOpacityValue((1 - VALUE) - .2)
        }
    }

    return (
        <Animated.ScrollView
            onScroll={(e) => calculandoOpacity(e.nativeEvent.contentOffset['x'])}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="end"
            snapToInterval={900}
            contentOffset={{ x: 2000 }}
            onScrollEndDrag={(e) => e.nativeEvent.contentOffset['x'] == 0 && animationSVBox()}
            style={{ ...styles.scrollViewBox, opacity: opacitySVBox, }}
        >
            <View style={{ ...styles.deleteItem, opacity: opacityValue }}>
                <Text
                    style={styles.deleteITemText}
                >{titleDelete[languageList[languageIndex]]}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                SM(element);
                navigation.navigate('Modal');
            }}
                style={{ ...styles.contentItem, backgroundColor: themeList[themeIndex].itemListBackground }}>
                <View style={styles.boxDay}>
                    <Text style={styles.textBoxDay} >{new Date(element.date).getDate()}</Text>
                </View>
                <View style={styles.boxMsg}>
                    <Text style={{ ...styles.textBoxMsg, color: themeList[themeIndex].itemListColor }}>{element.note}</Text>
                </View>
            </TouchableOpacity>
        </Animated.ScrollView>
    )
}



const styles = StyleSheet.create({
    todayView: {
        width: '94%',
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
    },
    textTodayView: {
        width: '100%',
        fontSize: 20,
        letterSpacing: 2,
        paddingLeft: 6,
    },
    deleteItem: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 240,
        height: 120,
        backgroundColor: '#dc3434',
        justifyContent: "center",
        alignSelf: 'center',
        marginRight: 10
    },
    deleteITemText: {
        fontSize: 30,
        alignContent: "center",
        justifyContent: 'center',
        textAlign: 'center',
        color: "#f1f1f1"
    },
    scrollViewBox: {
        width: '100%',
        height: 120,
        marginVertical: 10,
        alignSelf: 'center'
    },
    contentBox: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    boxContent: {
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'column',
    },
    textMonth: {
        width: '94%',
        alignSelf: 'center',
        marginTop: 15,
        height: 40,
        textAlignVertical: 'center',
        borderBottomWidth: 2,
        fontSize: 22,
        color: "#000"
    },

    contentItem: {
        width: ((Dimensions.get('window').width * 94) / 100),
        height: 120,
        backgroundColor: '#7895B2',
        alignSelf: 'center',
        borderRadius: 5,
        display: 'flex',
        flexDirection: "row",
    },
    boxDay: {
        width: 100,
        height: 100,
        alignItems: "center",
        marginHorizontal: 14,
        alignSelf: 'center',
        overflow: 'hidden',
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    textBoxDay: {
        width: '100%',
        height: '100%',
        fontSize: 70,
        textAlign: 'center',
        textAlignVertical: "center",
        marginBottom: 2,
        borderRadius: 6
    },
    textHours: {
        width: '100%',
        height: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 22,
        backgroundColor: '#69818e50',
        borderRadius: 6
    },
    boxMsg: {
        width: "72%",
        height: 100,
        alignSelf: 'center',
        borderLeftWidth: 5,
    },
    textBoxMsg: {
        width: "100%",
        height: "100%",
        fontSize: 24,
        textAlignVertical: 'center',
        paddingVertical: 4,
        paddingLeft: 12
    }
})