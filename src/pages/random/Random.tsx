import { useEffect, useState } from "react"
import { useGetMovies } from "../../hooks/useGetMovies"
import { IGenre } from "../../interfaces/Genre"
import "./Random.css"
import { IMovie } from "../../interfaces/Movie"

const apiKey = import.meta.env.VITE_API_KEY

const genreURL = import.meta.env.VITE_GENRE
const GENRE_URL:string = `${genreURL}?${apiKey}`

const discoverURL = import.meta.env.VITE_DISCOVER
const DISCOVER_MOVIES:string = `${discoverURL}?${apiKey}`

const Random = () => {

	const {loading, error, getGenres} = useGetMovies()
	const [genresList, setGenresList] = useState<IGenre[]>([])
/* 	useEffect(() => {
		console.log(genresList)
	}, [genresList]) */

	const [chosenGenres, setChosenGenres] = useState<IGenre[]>([])
/*  	useEffect(() => {
		console.log("LISTA: ", chosenGenres)
	}, [chosenGenres]) */

	const [poolOfMovies, setPoolOfMovies] = useState<any[]>([])
/* 	useEffect(() => {
		console.log("LISTA DE FILMES: ", poolOfMovies)
	}, [poolOfMovies]) */

	const [movieSelected, setMovieSelected] = useState<IMovie|null>(null)

	useEffect(() => {

		if (poolOfMovies.length < 100) return;

		const random =  Math.floor( Math.random() * 99 )
		
		console.log("RANDOM: ", poolOfMovies[random])

	}, [poolOfMovies])

	useEffect(() => {

		const getGenresAsync = async():Promise<void> => {
			const genres:any = await getGenres(GENRE_URL)
			setGenresList(genres.genres)
		}

		 getGenresAsync()

	}, [GENRE_URL])

	const handleSubmit = async(e: React.FormEvent):Promise<void> => {

		e.preventDefault()

		setPoolOfMovies([])

		if (chosenGenres.length === 0) return console.log("Escolha algum gênero.")

		try {
			let DISCOVER_MOVIE_FULLURL:string 
			if (chosenGenres.length === 1) {
				DISCOVER_MOVIE_FULLURL = `${DISCOVER_MOVIES}&with_genres=${chosenGenres[0].id}`
			} else if (chosenGenres.length === 2) {
				DISCOVER_MOVIE_FULLURL = `${DISCOVER_MOVIES}&with_genres=${chosenGenres[0].id}&with_genres=${chosenGenres[1].id}`
			} else {
				DISCOVER_MOVIE_FULLURL = `${DISCOVER_MOVIES}&with_genres=${chosenGenres[0].id}&with_genres=${chosenGenres[1].id}&with_genres=${chosenGenres[2].id}`
			}

			for (let a=1; a<=5; a++) {
				const res = await fetch(`${DISCOVER_MOVIE_FULLURL}&page=${a}`)
				const data = await res.json()
				setPoolOfMovies((prev) => [...prev,  ...data.results])
			}

		} catch (error) {
			console.log(error)
		}
	}

	const handleCheck = (e: any):void => {

		const genreSelected:IGenre = {
			id: (genresList.find((genre:IGenre) => genre.name === e.target.id.replace("-", " ")))?.id,
			name: e.target.id.replace("-", " ")
		} 

		console.log(genreSelected)

		const clickedElement = document.querySelector(`#${genreSelected.name.replace(" ", "-")}`)
		
		if (clickedElement?.className === "checked") {
			setChosenGenres((prev) => prev.filter(
				genre => genre.id !== genreSelected.id
			))
		}

		clickedElement?.classList.toggle("checked")	

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

				<input type="submit" value="Escolher filme"/>

			</form>

			<div className="movie-selected-container">

			</div>

		</div>
	)
}

export default Random