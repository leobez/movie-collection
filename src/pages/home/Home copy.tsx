import { useState, useEffect } from 'react'
import MoviePanel from '../../components/moviePanel/MoviePanel'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const genreURL = import.meta.env.VITE_GENRE

import { IMovie } from '../../interfaces/Movie'
import { IGenre } from '../../interfaces/Genre'

import "./Home.css"

const Home = () => {

	const [topMovies, setTopMovies] = useState<IMovie[]>([])
	const [page, setPage] = useState<number>(1)
	const [limitReached, setLimitReached] = useState<string>("")
	const [genres, setGenres] = useState<IGenre[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	const getTopRatedMovies = async(url: string): Promise<void> => {

		if (genres.length === 0) return;

		setLoading(true)

		const res = await fetch(url)
		const data = await res.json()

		if (data.page >= 499) {
			setLimitReached("Fim.")
			return;
		}

		const newData:never[] = data.results.map( (movie:IMovie): IMovie => {
			return {
				id					: movie.id,
				genre_ids			: movie.genre_ids, 

				genre_names			: movie.genre_ids.map(genre_id => {
										let genre:IGenre|undefined
										genre = genres.find(genre => genre.id === genre_id)
										return genre?.name
									}),

				title				: movie.title,
				original_title		: movie.original_title,
				original_language	: movie.original_language,
				overview			: movie.overview,
				popularity			: movie.popularity,
				poster_path			: movie.poster_path,
				release_date		: movie.release_date,
				vote_average		: movie.vote_average,
				vote_count			: movie.vote_count,
			}
		})

		if (topMovies.length === 0) {
			setTopMovies(newData)
		} else {
			if (topMovies !== newData) {
				if (data.page > 2) newData.shift()
				setTopMovies(prev => [...prev, ...newData])
			}
		}

		setLoading(false)

	}

	useEffect(() => {
		if (page === 1) setTopMovies([])
		const topRatedUrl = `${moviesURL}top_rated?${apiKey}&page=${page}`
		getTopRatedMovies(topRatedUrl)
	}, [genres, page])

	const handleLoadMore = ():void => {
		setPage((prev) => prev+1)
	}

	// GET GENRES LIST
	useEffect(() => {

		const genreurl = `${genreURL}?${apiKey}`

		const getGenres = async():Promise<void> => {

			try {
				const data = await fetch(genreurl)
					.then(res => res.json())
					.catch(err => err)
				
				setGenres(data.genres)

			} catch (error) {
				console.log(error)
			}
		}
		
		getGenres()

	}, [])

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

				<div className="movies">
					{topMovies && topMovies.map((movie: IMovie) => (
						<MoviePanel 
							movie={movie}
							key={movie.id}
						/>
					))}
				</div>
			</div>

			<div className='button_container_msg'>
					{limitReached.length === 0 ? (
						<>
							<button onClick={handleLoadMore}>Carregar mais</button>	
						</>
					) : (
						<>
							<p className='limit_reached'>{limitReached}</p>
						</>
					)}
			</div>
			
		</div>
	)
}

export default Home