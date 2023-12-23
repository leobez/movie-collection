import { useState, useEffect } from 'react'
import MoviePanel from '../../components/moviePanel/MoviePanel'

import { IMovie } from '../../interfaces/Movie'
import { IGenre } from '../../interfaces/Genre'

import "./Home.css"
import { useGetMovies } from '../../hooks/useGetMovies'
import { useGetGenres } from '../../hooks/useGetGenres'

const Home = () => {

	const { listOfMovies, loading, error } = useGetMovies(1)
	const {loading: genreLoading, error: genreError} = useGetGenres()

	const [topMovies, setTopMovies] = useState<IMovie[]>([])
	const [page, setPage] = useState<number>(1)
	const [limitReached, setLimitReached] = useState<string>("")
	const [genres, setGenres] = useState<IGenre[]>([])

	const getTopRatedMovies = async(url: string): Promise<void> => {

		if (genres.length === 0) return;

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
				setTopMovies(prev => [...prev, ...newData])
			}
		}

	}

	useEffect(() => {
		if (page === 1) setTopMovies([])
		const topRatedUrl = `${moviesURL}top_rated?${apiKey}&page=${page}`
		getTopRatedMovies(topRatedUrl)
	}, [genres, page])

	const handleLoadMore = ():void => {
		setPage((prev) => prev+1)
	}

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