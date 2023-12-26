import { useEffect } from 'react'
import "./Search.css"
import { IMovie } from '../../interfaces/Movie'
import { useQuery } from '../../hooks/useQuery';
import MoviePanel from '../../components/moviePanel/MoviePanel';
import { useGetMovies } from '../../hooks/useGetMovies';

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY
const genreURL = import.meta.env.VITE_GENRE

const Search = () => {

	const query = useQuery()
	const searchQ = query.get("q")

	const SEARCH_URL = `${searchURL}?query=${searchQ}&${apiKey}`
	const GENRE_URL = `${genreURL}?${apiKey}`

	const {loading, error, listOfMovies, setPage, setListOfMovies} = useGetMovies(SEARCH_URL, GENRE_URL)

	// Reseting list of movies when query changes
	useEffect(() => {
		setListOfMovies([])
	}, [searchQ])

	const handleClick = (): void => {
		return setPage((prev) => prev+1)
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
					{listOfMovies && listOfMovies.map((movie: IMovie) => (
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

export default Search