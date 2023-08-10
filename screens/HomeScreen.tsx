import React from 'react'
import axios from 'axios'
import { View, Text, FlatList, Pressable, StyleSheet, LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App'

LogBox.ignoreAllLogs();

const HomeScreen = () => {
    const [pageNumber, setPageNumber] = React.useState<number | any>(0)
    const [data, setData] = React.useState<[] | any>([])
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'HomeScreen'>>()

    const fetchPollData = async () => {
        try {
            const response = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`)
            setData([...data, ...response?.data?.hits])
        } catch (e) {
            alert("No results found")
        }
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    React.useEffect(() => {
        if (pageNumber == 0) {
            fetchPollData();
        } else {
            (async () => {
                await sleep(10000);
                fetchPollData()
            })
        }
    }, [pageNumber])

    const increasePageNumber = () => {
        setPageNumber(pageNumber + 1)
        console.warn(pageNumber)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container1}>
                <Text style={styles.header}>URL</Text>
                <Text style={styles.header}>Title</Text>
                <Text style={styles.header}>Created At</Text>
                <Text style={styles.header}>Author</Text>
            </View>
            <View >
                <FlatList 
                    data={data}
                    onEndReachedThreshold={0.75}
                    onEndReached={increasePageNumber}
                    renderItem={({ item }: any) =>
                        <Pressable style={styles.container2} onPress={() => {
                            navigator.navigate('RawJsonScreen', { data: item })
                        }}>
                            <Text style={styles.rows}>{item?.url}</Text>
                            <Text style={styles.rows}>{item?.title}</Text>
                            <Text style={styles.rows}>{item?.created_at}</Text>
                            <Text style={styles.rows}>{item?.author}</Text>
                        </Pressable>} />
            </View>
        </View>
    )
}
export default HomeScreen

const styles = StyleSheet.create({

    container1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        padding: '3%',
        marginBottom: 2

    },
    header: {
        fontWeight: 'bold'
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        marginTop: 1
    },

    rows: {
        width: '25%',
        textAlign: 'center',
        height: '100%',
        borderRightWidth: 0.5,
    }
})