import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from "react-native";
import { DataContext } from "../App";


let meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre',
    'Diciembre',
]

export default function ItemDate(props) {
    let { info } = useContext(DataContext)

    return (
        <View style={styles.contentBox}>
            <FlatList
                data={props.element.NLY}
                renderItem={({ item }) =>
                    <View style={styles.boxContent}>
                        <Text style={ info.theme === 'light' ? styles.textMonthLight : styles.textMonthDark}>{meses[item.month] + " - " + props.element.year}</Text>
                        <FlatList
                            data={item.NLM}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => props.setModal(item)} style={styles.contentItem}>
                                    <View style={styles.boxDay}>
                                        <Text style={styles.textBoxDay} >{item.date.getDate().toString()}</Text>
                                    </View>
                                    <View style={styles.boxMsg}>
                                        <Text style={styles.textBoxMsg}>{item.note}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.id}
                        />
                    </View>
                }
                keyExtractor={item => item.month}
            />
        </View>
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
    textMonthLight: {
        width: '94%',
        alignSelf: 'center',
        marginTop: 15,
        height: 40,
        textAlignVertical: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        fontSize: 22,
        color: "#000"
    },
    textMonthDark: {
        width: '94%',
        alignSelf: 'center',
        marginTop: 15,
        height: 40,
        textAlignVertical: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        fontSize: 22,
        color: "#fff"
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
        borderRadius: 10

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