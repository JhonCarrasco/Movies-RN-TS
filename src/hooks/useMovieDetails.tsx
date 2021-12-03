import { useEffect, useState } from "react"
import movieDB from "../apis/movieDB"
import { CreditsResponse } from "../interfaces/creditsInterface"
import { MovieDetailsResponse } from "../interfaces/movieInterface"

interface MovieDetailsState {
    isLoading: boolean
    movieDetails?: MovieDetailsResponse
    cast: any[]
}

export const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetailsState>({
        isLoading: true,
        movieDetails: undefined,
        cast: []
    })

    const getMovieDetails = async () => {
        const movieDetailsPromise = movieDB.get<MovieDetailsResponse>(`${ movieId }`)
        const creditsPromise = movieDB.get<CreditsResponse>(`${ movieId }/credits`)
        
        // Desestructurar renombrando promesas
        const [movieDetailsResp, castPromiseResp] = await Promise.all([
            movieDetailsPromise,
            creditsPromise,
        ])

        setState({
            isLoading: false,
            movieDetails: movieDetailsResp.data,
            cast: castPromiseResp.data.cast
        })
    }

        
    useEffect(() => {
        getMovieDetails()
    }, [])

    return {
        ...state
    }
}
