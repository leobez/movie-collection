import MoviePanel from '../../components/moviePanel/MoviePanel'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const genreURL = import.meta.env.VITE_GENRE

const MOVIE_URL:string = `${moviesURL}top_rated?${apiKey}`
const GENRE_URL:string = `${genreURL}?${apiKey}`

import "./Home.css"
import { useGetMovies } from '../../hooks/useGetMovies'
import { IMovie } from '../../interfaces/Movie'

const Home = () => {

	const {loading, error, listOfMovies, setPage} = useGetMovies(MOVIE_URL, GENRE_URL)

	const handleClick = (): void => {
		return setPage((prev) => prev+1)
	}

	return (
		<div className='Home'>

			<div className="home-container">

				<div className='title'>
					<p>
						Os filmes mais bem avaliados de acordo com o
						<a href="https://developer.themoviedb.org/reference/intro/getting-started" target='_blank'>
							TMDB API
						</a>
					</p>
				</div>

				<div className="movies">
					{listOfMovies && listOfMovies.map((movie:IMovie) => (
						<MoviePanel 
							movie={movie}
							key={movie.id}
						/>
					))}
				</div>

			</div>
			
			{/* BUTTON, LOADING, ERROR */}
			<div className='extra-container'>
				{loading && <div><p>Carregando...</p></div>}
				<div className='button_container'>
					{error !== "Limite alcançado." && <button onClick={handleClick}>Carregar mais</button>}
				</div>
				{error && <div className='msg_container'><p>{error}</p></div>}
			</div>

		</div>
	)
}

export default Home