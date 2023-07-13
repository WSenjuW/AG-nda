import { Animated, View, StyleSheet, TouchableOpacity, Text, Dimensions, FlatList } from "react-native";
import { useContext, useState, useRef } from "react";
import { DataContext } from "../Navigation_InfoContext/InfoContext";
import { LinearGradient } from "expo-linear-gradient";
import { v4 as uuidv4 } from 'uuid';
import { TODAY , DELETE_TITLE } from '../StaticText.json';


export default function TodayItem({ navigation, setModal }) {
    let { languageList, languageIndex, todayNotes } = useContext(DataContext).info;

    return (
        <View style={styles1.todayView}>
            <LinearGradient
                colors={['#F04B4F', 'transparent']}
                style={{ width: '60%', height: 30 }}
                start={[.2, 0]}
                end={[.9, 0]}
            >
                <Text style={styles1.textTodayView}
                >{TODAY[languageList[languageIndex]] + " - " + new Date().getFullYear()}</Text>
            </LinearGradient>
            {
                todayNotes.map((element) =>
                    <TodayItemList
                        key={uuidv4()}
                        navigation={navigation}
                        element={element}
                        SM={setModal}
                    />)
            }
        </View>
    )
}

const styles1 = StyleSheet.create({
    todayView: {
        width: '100%',
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
    },
    textTodayView: {
        width: '100%',
        fontSize: 20,
        letterSpacing: 2,
        paddingLeft: 6,
        color: '#fff'
    },
})

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

    const Date_Today = new Date(element.date);
    const Minutes = Date_Today.getMinutes().toString().length === 1 ?  ('0' + Date_Today.getMinutes()) : Date_Today.getMinutes();

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
            <View style={{ ...styles.deleteBox, opacity: opacityValue }}>
                <Text
                    style={styles.deleteText}
                >{DELETE_TITLE[languageList[languageIndex]]}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                SM(element);
                navigation.navigate('Modal');
            }}
                style={{ ...styles.contentItem, backgroundColor: themeList[themeIndex].itemListBackground }}>
                <View style={styles.boxDate}>
                    <Text style={styles.textHours} >{TODAY[languageList[languageIndex]]}</Text>
                    <Text style={styles.textBDToday} >{Date_Today.getHours() + ":" + Minutes}</Text>
                </View>
                <View style={styles.boxMsg}>
                    <Text style={{ ...styles.textBoxMsg, color: themeList[themeIndex].textColor }}>{element.note}</Text>
                </View>
            </TouchableOpacity>
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    deleteBox: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 240,
        height: 120,
        backgroundColor: '#dc3434',
        justifyContent: "center",
        alignSelf: 'center',
        marginRight: 10
    },
    deleteText: {
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
    contentItem: {
        width: ((Dimensions.get('window').width * 94) / 100),
        height: 120,
        backgroundColor: '#7895B2',
        alignSelf: 'center',
        borderRadius: 12,
        padding:4,
        display: 'flex',
        flexDirection: "row",
    },
    boxDate: {
        width: 118,
        height: 112,
        alignItems: "center",
        alignSelf: 'center',
        overflow: 'hidden',
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    textBDToday: {
        width: '100%',
        height: '70%',
        fontSize: 34,
        color:'#5E5E5E',
        textAlign: 'center',
        textAlignVertical: "center",
    },
    textHours: {
        width: '100%',
        backgroundColor: '#F04B4F',
        height: "30%",
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        color: "#f1f1f1"
    },
    boxMsg: {
        width: "75%",
        height: 100,
        alignSelf: 'center',
        marginLeft:4,
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