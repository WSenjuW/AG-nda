import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from "react-native";
import { DataContext } from "./InfoContext";


let meses = [
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
]

export default function ItemDate({ element, setModal }) {
    let { theme, themeList, themeIndex } = useContext(DataContext).info

    return (
        <View style={styles.contentBox}>
            <FlatList
                data={element.NLY}
                renderItem={({ item }) =>
                    <View style={styles.boxContent}>
                        <Text style={{
                            ...styles.textMonth,
                            color: themeList[themeIndex].textColor,
                            borderBottomColor: themeList[themeIndex].textColor
                        }}
                        >{meses[item.month] + " - " + element.year}</Text>
                        <FlatList
                            data={item.NLM}
                            renderItem={({ item }) => <ItemList theme={theme} element={item} SM={setModal} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                }
                keyExtractor={item => item.month}
            />
        </View>
    )
}


function ItemList({ element, SM }) {
    let { theme, themeList, themeIndex } = useContext(DataContext).info

    return (
        <TouchableOpacity onPress={() => SM(element)} style={{ ...styles.contentItem, backgroundColor: themeList[themeIndex].itemListBackground }}>
            <View style={styles.boxDay}>
                <Text style={styles.textBoxDay} >{element.date.getDate().toString()}</Text>
            </View>
            <View style={styles.boxMsg}>
                <Text style={{ ...styles.textBoxMsg, color: themeList[themeIndex].itemListColor }}>{element.note}</Text>
            </View>
        </TouchableOpacity>

    )
}





const styles = StyleSheet.create({
    boxContent: {
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'column',
    },
    contentBox: {
        width: '100%',
        height: 'auto',
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
        width: '94%',
        height: 120,
        backgroundColor: '#7895B2',
        marginVertical: 12,
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