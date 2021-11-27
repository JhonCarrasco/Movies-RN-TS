import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RootStackParams } from '../navigation/Navigation'

const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route }: Props) => {

    const movie = route.params
    const url_image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: url_image }}
                    style={styles.image}
                />
            </View>

            <View style={styles.marginContainer}>
                <Text style={styles.subtitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,

        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        backgroundColor: 'red'
    },
    image: {
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})