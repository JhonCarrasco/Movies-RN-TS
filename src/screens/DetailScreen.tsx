import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { MovieDetails } from '../components/MovieDetails'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { RootStackParams } from '../navigation/Navigation'

import SpinLoading from '../components/SpinLoading'
import { SafeAreaView } from 'react-native-safe-area-context'

const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params
    const url_image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const { isLoading, movieDetails, cast } = useMovieDetails(movie.id)


    return (
        <SafeAreaView>
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

                {isLoading
                    ? <SpinLoading color='grey' size={35} />
                    : <MovieDetails movieDetails={movieDetails!} cast={cast} />
                }

                {/* Botón para cerrar} */}
                <View style={styles.backButton}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Icon
                            color='white'
                            name='arrow-back-outline'
                            size={50}
                        />
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
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
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 10,
        left: 10,
    }
})