import { useEffect, useState } from "react"
import { useGetMovies } from "../../hooks/useGetMovies"
import { IGenre } from "../../interfaces/Genre"
import "./Random.css"

const apiKey = import.meta.env.VITE_API_KEY

const genreURL = import.meta.env.VITE_GENRE

const GENRE_URL:string = `${genreURL}?${apiKey}`

const Random = () => {

	const {loading, error, getGenres} = useGetMovies()
	const [genresList, setGenresList] = useState<IGenre[]>([])

	useEffect(() => {

		const getGenresAsync = async():Promise<void> => {
			const genres:any = await getGenres(GENRE_URL)
			setGenresList(genres.genres)
		}

		 getGenresAsync()

	}, [GENRE_URL])

	const handleSubmit = async(e: React.FormEvent):Promise<void> => {
		e.preventDefault()
	}

	return (
		<div className="random">

			<div className="form-continer">
				
				<form onSubmit={handleSubmit}>

					<div className="choices-panel">

						{genresList && genresList.map(genre => (
							<div key={genre.id}>
								<p>
									<span>
										{genre.name}
									</span>
								</p>
							</div>
						))}

					</div>
					

					<input type="submit" value="Escolher filme"/>

				</form>

			</div>

			<div className="movie-selected-container"></div>

		</div>
	)
}

export default Random