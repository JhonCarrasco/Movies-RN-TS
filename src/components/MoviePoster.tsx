import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Movie } from '../interfaces/movieInterface'

interface Props {
    movie: Movie
    height?: number
    width?: number
}

const { width: windowWidth } = Dimensions.get('window')
export const MoviePoster = ({ movie, height = 400, width = windowWidth * 3 / 5 }: Props) => {

    const url_image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DetailScreen', movie)}
            activeOpacity={0.8}
            style={{
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7,
            }}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: url_image }}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.84,

        elevation: 9,
        borderRadius: 18,
    },
    image: {
        flex: 1,
        borderRadius: 18
    },
})