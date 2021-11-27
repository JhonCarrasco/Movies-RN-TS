
import React from 'react'
import { Dimensions, View, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'

import { HorizontalSlider } from '../components/HorizontalSlider'
import { MoviePoster } from '../components/MoviePoster'
import SpinLoading from '../components/SpinLoading'
import { useMovies } from '../hooks/useMovies'

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

    if (isLoading) {
        return <SpinLoading color={'red'} size={100} />
    }

    return (
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
    )
}
