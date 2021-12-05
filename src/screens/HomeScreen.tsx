
import React, { useContext, useEffect } from 'react'
import { Dimensions, View, ScrollView } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'

import { GradientBackground } from '../components/GradientBackground'
import { HorizontalSlider } from '../components/HorizontalSlider'
import { MoviePoster } from '../components/MoviePoster'
import SpinLoading from '../components/SpinLoading'
import { useMovies } from '../hooks/useMovies'
import { getImageColors } from '../helpers/getColors'
import { GradientContext } from '../context/GradientContext'

const { width } = Dimensions.get('window')

export const HomeScreen = () => {

    const {
        nowPlaying,
        popular,
        topRated,
        upcoming,
        isLoading
    } = useMovies()
    const { top } = useSafeAreaInsets()
    const { setMainColors, setMainPrevColors } = useContext(GradientContext)


    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColor(0)
        }
    }, [nowPlaying])

    const getPosterColor = async (index: number) => {
        const movie = nowPlaying[index]
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        const [primary = 'green', secondary = 'orange'] = await getImageColors(uri)

        setMainColors({ primary, secondary })
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                isLoading
                    ? <SpinLoading color={'red'} size={100} />
                    : (
                        <GradientBackground>
                            <ScrollView>
                                <View style={{ flex: 1, marginTop: top + 20 }}>

                                    <View style={{
                                        minHeight: 440,
                                    }}>
                                        <Carousel
                                            enableMomentum
                                            data={nowPlaying}
                                            renderItem={({ item, index }: any) => <MoviePoster key={index} movie={item} />}
                                            sliderWidth={width}
                                            itemWidth={width * 3 / 5}
                                            inactiveSlideOpacity={1}
                                            onSnapToItem={index => getPosterColor(index)} // posición del slide seleccionado
                                        />
                                    </View>

                                    <HorizontalSlider
                                        title='Popular'
                                        movies={popular}
                                    />

                                    <HorizontalSlider
                                        title='Top rated'
                                        movies={topRated}
                                    />

                                    <HorizontalSlider
                                        title='Upcoming'
                                        movies={upcoming}
                                    />


                                </View>
                            </ScrollView>
                        </GradientBackground>
                    )
            }
        </SafeAreaView>
    )
}
