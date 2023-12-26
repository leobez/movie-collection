import { useState, useEffect } from 'react'
import MoviePanel from '../../components/moviePanel/MoviePanel'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const genreURL = import.meta.env.VITE_GENRE

const MOVIE_URL = `${moviesURL}top_rated?${apiKey}`
const GENRE_URL = `${genreURL}?${apiKey}`

import "./Home.css"
import { useGetMovies } from '../../hooks/useGetMovies'
import { IMovie } from '../../interfaces/Movie'

const Home = () => {

	const {loading, error, listOfMovies, setPage} = useGetMovies(MOVIE_URL, GENRE_URL)

	useEffect(() => {
		console.log(listOfMovies)
	}, [listOfMovies])

	return (
		<div className='Home'>

			<div className="home-container">

				<div className='title'>
					<p>
						Os filmes mais bem avaliados de acordo com o
					</p>
					<a href="https://developer.themoviedb.org/reference/intro/getting-started" target='_blank'>
						TMDB API
					</a>
				</div>

				{loading ? (
					<>
						<div className='loading'>
							<p>Carregando...</p>
						</div>
					</>
				) : (
					<>
						<div className="movies">
							{listOfMovies && listOfMovies.map((movie:IMovie) => (
								<MoviePanel 
									movie={movie}
									key={movie.id}
								/>
							))}
						</div>
					</>
				)}

			</div>

			<div className='button_container'>
				{error !== "Limite alcançado." && <button onClick={() => setPage((prev) => prev+1)}>Carregar mais</button>}
			</div>

			{error && <div className='msg_container'><p>{error}</p></div>}
			
		</div>
	)
}

export default Home