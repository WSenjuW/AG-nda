import { useContext, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text, FlatList, Dimensions, Animated } from "react-native";
import { DataContext } from "./InfoContext";
import { v4 as uuidv4 } from 'uuid';

const titleDelete = {
    es: 'Eliminar',
    en: 'Delete'
}


let months = {
    es: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ],
    en: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
}



export default function ItemDate({ element, setModal }) {
    let { theme,
        themeList,
        themeIndex,
        languageList,
        languageIndex,
        notes } = useContext(DataContext).info

    return (
        <View style={styles.contentBox}>
            <FlatList
                data={Object.keys(notes[element])}
                renderItem={({ item }) =>
                    <View style={styles.boxContent}>
                        <Text style={{
                            ...styles.textMonth,
                            color: themeList[themeIndex].textColor,
                            borderBottomColor: themeList[themeIndex].textColor
                        }}
                        >{months[languageList[languageIndex]][item] + " - " + element}</Text>
                        <FlatList
                            data={notes[element][item]}
                            renderItem={({ item }) => <ItemList theme={theme} element={item} SM={setModal} />}
                            keyExtractor={(item) => uuidv4()}
                        />
                    </View>
                }
                keyExtractor={(item) => uuidv4()}
            />
        </View>
    )
}




function ItemList({ element, SM }) {
    let { themeList, themeIndex, languageIndex, languageList } = useContext(DataContext).info;
    let { dispatch } = useContext(DataContext);
    const opacitySVBox = useRef(new Animated.Value(1)).current;




    function animationSVBox() {
        Animated.timing(opacitySVBox, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }).start(({ finished }) =>
            finished === true && dispatch({ type: 'REMOVE_NOTE', item: { item: element, oldItem: undefined } })
        )
    }

    return (
        <Animated.ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="end"
            snapToInterval={900}
            contentOffset={{ x: 210 }}
            onScrollEndDrag={(e) => e.nativeEvent.contentOffset['x'] == 0 && animationSVBox()}
            style={{
                ...styles.scrollViewBox,
                opacity: opacitySVBox,
            }}
        >
            <View style={styles.deleteItem}>
                <Text
                    style={styles.deleteITemText}
                >{titleDelete[languageList[languageIndex]]}</Text>
            </View>
            <TouchableOpacity onPress={() => SM(element)} style={{ ...styles.contentItem, backgroundColor: themeList[themeIndex].itemListBackground }}>
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
    deleteItem: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 200,
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
        width: '94%',
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