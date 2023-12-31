import { useEffect, useState } from "react"
import { useGetMovies } from "../../hooks/useGetMovies"
import { IGenre } from "../../interfaces/Genre"
import "./Random.css"
import { IMovie } from "../../interfaces/Movie"
import MoviePanel from "../../components/moviePanel/MoviePanel"

const apiKey = import.meta.env.VITE_API_KEY

const genreURL = import.meta.env.VITE_GENRE
const GENRE_URL:string = `${genreURL}?${apiKey}`

const discoverURL = import.meta.env.VITE_DISCOVER
const DISCOVER_URL:string = `${discoverURL}?${apiKey}`

const Random = () => {

	// This variable sets the amount of movies there will be in the pool to be chosen from
	// Divisible by 20 pls
	const SIZE_OF_POOL = 100;

	// Get genres and movies
	const {loading, error, getGenres} = useGetMovies(DISCOVER_URL, GENRE_URL)

	// Errors from this component 
	const [randomError, setRandomError] = useState<string>("")

	// Save state of genres
	const [genresList, setGenresList] = useState<IGenre[]>([])

	// State of chosen genres
	const [chosenGenres, setChosenGenres] = useState<IGenre[]>([])

	// Complete pool of movies (100)
	const [poolOfMovies, setPoolOfMovies] = useState<any[]>([])

	// Movie that was randomly selected
	const [movieSelected, setMovieSelected] = useState<IMovie|null>(null)
	const [loadingMovieSelected, setLoadingMovieSelected] = useState<boolean>(false)
	useEffect(() => console.log(movieSelected), [movieSelected])

	// Select the movie after the pool was chosen
	useEffect(() => {
		if (poolOfMovies.length < SIZE_OF_POOL) return;
		const random =  Math.floor( Math.random() * SIZE_OF_POOL-1)
		console.log("FILME ESCOLHIDO: ", poolOfMovies[random])
		setMovieSelected(poolOfMovies[random])
	}, [poolOfMovies])

	// Get genres
	useEffect(() => {
		const getGenresAsync = async():Promise<void> => {
			const genres:any = await getGenres(GENRE_URL)
			setGenresList(genres.genres)
		}
		 getGenresAsync()
	}, [GENRE_URL])

	// Submit chosen genres
	const handleSubmit = async(e: React.FormEvent):Promise<void> => {

		e.preventDefault()

		setRandomError("")
		setPoolOfMovies([])

		if (chosenGenres.length === 0) return setRandomError("Escolha pelo menos um gênero.")

		try {
			
			let DISCOVER_MOVIE_FULLURL:string 

			if (chosenGenres.length === 1) {
				DISCOVER_MOVIE_FULLURL = `${DISCOVER_URL}&with_genres=${chosenGenres[0].id}`
			} else if (chosenGenres.length === 2) {
				DISCOVER_MOVIE_FULLURL = `${DISCOVER_URL}&with_genres=${chosenGenres[0].id}&with_genres=${chosenGenres[1].id}`
			} else {
				DISCOVER_MOVIE_FULLURL = `${DISCOVER_URL}&with_genres=${chosenGenres[0].id}&with_genres=${chosenGenres[1].id}&with_genres=${chosenGenres[2].id}`
			}

			setLoadingMovieSelected(true)
			for (let a=1; a<=Math.floor(SIZE_OF_POOL/20); a++) {

				const res = await fetch(`${DISCOVER_MOVIE_FULLURL}&page=${a}`)

				const data = await res.json()

				if (data.results.length === 0) break;
				
				const PARSED_movieData:IMovie[] = data.results.map((movie:any):IMovie => {

					return {
						id					: movie.id,
						genre_ids			: movie.genre_ids, 

						genre_names			: movie.genre_ids.map((genre_id:number):IGenre|undefined => {
												let genre:IGenre|undefined = genresList.find(
													(genre:IGenre) => genre.id === genre_id
												)
												return genre;
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

				setPoolOfMovies((prev) => [...prev,  ...PARSED_movieData])
			}

			setLoadingMovieSelected(false)

		} catch (error) {
			setLoadingMovieSelected(false)
			setRandomError("Algo deu errado.")
		}
	}

	// Check if chosen genre is valid
	const handleCheck = (e: any):void => {

		// Object of genre that was clicked
		const genreSelected:IGenre = {
			id: (genresList.find((genre:IGenre) => genre.name === e.target.id.replace("-", " ")))?.id,
			name: e.target.id.replace("-", " ")
		} 

		const clickedElement = document.querySelector(`#${genreSelected.name.replace(" ", "-")}`)

		// Gets removed from array if was already clicked
		if (clickedElement?.className === "checked") {
			setChosenGenres((prev) => prev.filter(
				genre => genre.id !== genreSelected.id
			))
		}

		// (this is css only) IF was checked, gets unchecked and vice-versa 
		clickedElement?.classList.toggle("checked")	

		// If array of genres already has 3 elements, then it gets unchecked again
		// If not, then it gets added to array of genres
		if (clickedElement?.className === "checked") {
			if (chosenGenres.length >= 3) {
				clickedElement?.classList.toggle("checked")	
			} else {
				setChosenGenres((prev) => [...prev, genreSelected])
			}
		}
	}

	return (
		<div className="random">
			
			<div className="random-content">

				<form onSubmit={handleSubmit}>

					<div className="title">
						<p>Selecione 3 gêneros e então seja sorteado um filme !</p>
					</div>

					<div className="choices-panel">

						{genresList && genresList.map(genre => (

							<div key={genre.id} id={genre.name.replace(" ", "-")} onClick={handleCheck}>
								{genre.name}
							</div>

						))}

					</div>

					<input type="submit" value="Sortear filme"/>

				</form>

				<div className="movie-selected-container">
					{movieSelected ? (
						<MoviePanel movie={movieSelected}></MoviePanel>
					) : (
						<div className="extra">
							{loadingMovieSelected && <p>Sorteando filme...</p>}
							{!movieSelected && !loadingMovieSelected && <p>Aperte o botão para sortear um filme!</p>}
						</div>
					)}	
				</div>
			</div>
			
			{/* LOADING, ERROR -> FOR GENRES LIST */}
			<div className="extra-container">
				{loading 				&& <p className='message'>Carregando...</p>}
				{error.length!=0 		&& <p className='message'>{error}</p>}
				{randomError.length!=0 	&& <p className='message'>{randomError}</p>}
			</div>

		</div>
	)
}

export default Random