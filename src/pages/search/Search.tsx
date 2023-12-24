import { useEffect, useState } from 'react'
import "./Search.css"
import { IMovie } from '../../interfaces/Movie'
import { IGenre } from '../../interfaces/Genre'
import { useQuery } from '../../hooks/useQuery';
import MoviePanel from '../../components/moviePanel/MoviePanel';

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY
const genreURL = import.meta.env.VITE_GENRE

const Search = () => {

	const query = useQuery()
	const searchQ = query.get("q")
	const [genres, setGenres] = useState<IGenre[]>([])
	const [searchedMovies, setSearchedMovies] = useState<IMovie[]>([])
	const [limitReached, setLimitReached] = useState<string>("")
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		setPage(1)
		setSearchedMovies([])
		setLimitReached("")
	}, [searchQ])


	useEffect(() => {

		if (genres.length === 0) return;

		const search = async(q: string|null):Promise<void> => {

			const url = `${searchURL}?query=${q}&${apiKey}&page=${page}`
	
			try {
	
				const res = await fetch(url)
				const data = await res.json()
				
				if (data.results.length === 0 ) setLimitReached("Fim.")

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

				if (searchedMovies.length === 0) {
					setSearchedMovies(newData)
				} else {
					if (searchedMovies !== newData) {
						if (data.page > 2) newData.shift()
						setSearchedMovies(prev => [...prev, ...newData])
					}
				}

			} catch (error) {
				console.log(error)
			}
	
		}

		console.log("QUERY: ", searchQ)

		search(searchQ)

	}, [searchQ, genres, page])

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

	const handleLoadMore = ():void => {
		setPage((prev) => prev+1)
	}

	return (
		<div className='search'>
			<div className="search-container">

				<div className='title'>
					<p>
						Você pesquisou por: {searchQ}
					</p>
				</div>

				<div className="movies">
					{searchedMovies && searchedMovies.map((movie: IMovie) => (
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

export default Search