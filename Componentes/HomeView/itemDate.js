import { useContext, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, FlatList, Dimensions, Animated } from "react-native";
import { DataContext } from "../Navigation_InfoContext/InfoContext";
import { v4 as uuidv4 } from 'uuid';
import { MONTHS, DELETE_TITLE, MONTHS_COLORS } from '../StaticText.json';

export default function ItemDate({ element, setModal, navigation }) {
    let { theme,
        themeList,
        themeIndex,
        notes } = useContext(DataContext).info

    const TodayDate = new Date();

    return (
        <View style={styles1.contentBox}>
            {
                TodayDate.getFullYear() != element
                &&
                <Text style={{
                    ...styles1.textMonth,
                    color: themeList[themeIndex].textColor,
                    borderBottomColor: themeList[themeIndex].textColor
                }}
                >{element}
                </Text>
            }
            {Object.keys(notes[element]).map((el) =>
                <View
                    key={uuidv4()}
                    style={styles.boxContent}
                >
                    {
                        notes[element][el].map((elemento) => <ItemList key={uuidv4()} navigation={navigation} theme={theme} element={elemento} SM={setModal} />)
                    }
                </View>
            )}
        </View>
    )
}

const styles1 = StyleSheet.create({
    contentBox: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    textMonth: {
        width: '100%',
        alignSelf: 'center',
        height: 40,
        textAlignVertical: 'center',
        borderBottomWidth: 2,
        fontSize: 22,
        color: "#000",
        paddingLeft: 2,
        letterSpacing: 2
    },
});

function ItemList({ element, SM, navigation }) {
    let { themeList, themeIndex, languageIndex, languageList } = useContext(DataContext).info;
    let { dispatch } = useContext(DataContext);
    const opacitySVBox = useRef(new Animated.Value(1)).current;
    const [opacityValue, setOpacityValue] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    function animationSVBox() {
        Animated.timing(opacitySVBox, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }).start(({ finished }) =>
            dispatch({
                type: 'REMOVE_NOTE',
                item: element,
                oldItem: undefined
            })
        )
    };

    function calculandoOpacity(e) {
        if (e > maxScroll) {
            setMaxScroll(e);
        } else {
            let VALUE = Math.round((e * 100) / maxScroll) / 100;
            setOpacityValue((1 - VALUE) - .2)
        }
    };

    return (
        <Animated.ScrollView
            onScroll={(e) => calculandoOpacity(e.nativeEvent.contentOffset['x'])}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="end"
            snapToInterval={900}
            contentOffset={{ x: 2000 }}
            onScrollEndDrag={(e) => e.nativeEvent.contentOffset['x'] == 0 && animationSVBox()}
            style={{
                ...styles.scrollViewBox,
                opacity: opacitySVBox,
            }}
        >
            <View style={{ ...styles.deleteItem, opacity: opacityValue }}>
                <Text style={styles.deleteITemText}
                >{DELETE_TITLE[languageList[languageIndex]]}</Text>
            </View>
            <TouchableOpacity onPress={() => { SM(element); navigation.navigate('Modal'); }}
                style={{ ...styles.contentItem, backgroundColor: themeList[themeIndex].itemListBackground }}>
                <View style={styles.boxDate}>
                    <Text style={{...styles.textMonthBD,
                        backgroundColor:MONTHS_COLORS[new Date(element.date).getMonth()]}}>
                        {MONTHS[languageList[languageIndex]][new Date(element.date).getMonth()]}
                    </Text>
                    <Text style={styles.textDayBD} >{new Date(element.date).getDate()}</Text>
                </View>
                <View style={styles.boxMsg}>
                    <Text style={{ ...styles.textBoxMsg, color: themeList[themeIndex].textColor }}>{element.note}</Text>
                </View>
            </TouchableOpacity>
        </Animated.ScrollView>

    )
}

const styles = StyleSheet.create({
    contentItem: {
        width: ((Dimensions.get('window').width * 94) / 100),
        height: 120,
        backgroundColor: '#7895B2',
        alignSelf: 'center',
        borderRadius: 12,
        display: 'flex',
        flexDirection: "row",
        padding: 4
    },
    boxDate: {
        width: 118,
        height: 112,
        alignItems: "center",
        alignSelf: 'center',
        overflow: 'hidden',
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#f1f1f1',
        borderRadius: 12,
    },
    textMonthBD: {
        width: '100%',
        height: '30%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#f1f1f1'
    },
    textDayBD: {
        width: '100%',
        height: '70%',
        fontSize: 60,
        textAlign: 'center',
        textAlignVertical: "center",
        color: '#5E5E5E',
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
        alignSelf: 'center',

    },
    boxContent: {
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'column',
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