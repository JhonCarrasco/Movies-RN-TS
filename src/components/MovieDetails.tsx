import React from 'react'
import { Text, View, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import currencyFormatter from 'currency-formatter'
import { Cast } from '../interfaces/creditsInterface'
import { MovieDetailsResponse } from '../interfaces/movieInterface'
import { CastItem } from './CastItem'

interface Props {
    movieDetails: MovieDetailsResponse
    cast: Cast[]
}
export const MovieDetails = ({ movieDetails, cast }: Props) => {
    return (
        <>
            {/* Detalles */}
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name='star-outline'
                        size={16}
                        color='grey'
                    />
                    <Text style={{ fontSize: 16, marginLeft: 5 }}>{movieDetails.vote_average}</Text>

                    <Text style={{ marginLeft: 5, fontSize: 14, lineHeight: 22 }}>
                        - {movieDetails.genres.map(g => g.name).join(', ')}
                    </Text>
                </View>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Historia
                </Text>

                <Text style={{ fontSize: 16 }}>
                    {movieDetails.overview}
                </Text>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {currencyFormatter.format(movieDetails.budget, { code: 'USD' })}
                </Text>

            </View>

            {/* Casting */}
            <View style={{ marginTop: 10, marginBottom: 100 }}>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Actores
                </Text>

                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <CastItem actor={item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10, height: 70 }}
                />
            </View>

        </>
    )
}
