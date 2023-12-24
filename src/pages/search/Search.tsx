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

	useEffect(() => {
		console.log(searchedMovies)
	}, [searchedMovies])

	useEffect(() => {

		if (genres.length === 0) return;

		const search = async(q: string|null):Promise<void> => {

			const url = `${searchURL}?query=${q}&${apiKey}`
	
			try {
	
				const res = await fetch(url)
				const data = await res.json()
	
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
		
				setSearchedMovies(newData)

			} catch (error) {
				console.log(error)
			}
	
		}

		console.log("QUERY: ", searchQ)

		search(searchQ)

	}, [searchQ, genres])

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
		</div>
	)
}

export default Search