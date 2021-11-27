import axios from 'axios'

const movieDB = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '0723e7b13ee0c93e328c91e373e94f79',
        language: 'es-ES'
    }
})

export default movieDB