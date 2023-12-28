import { useEffect, useState } from "react"
import { IMovieComplete } from "../interfaces/MovieComplete"

export const useGetMovie = (MOVIE_URL:string) => {

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>("")
	const [movie, setMovie] = useState<IMovieComplete|null>(null)

	useEffect(() => {

		const getMovie = async():Promise<void> => {

			try {
				
				setLoading(true)

				const movieRes = await fetch(MOVIE_URL)
				const movieData = await movieRes.json()

				setLoading(false)

				const newData:IMovieComplete = {
					budget					: movieData.budget,
					genres					: movieData.genres,
					id						: movieData.id, 
					original_language		: movieData.original_language,
					original_title			: movieData.original_title,
					overview				: movieData.overview,
					popularity				: movieData.popularity,
					poster_path				: movieData.poster_path,
					production_companies	: movieData.production_companies,
					production_countries	: movieData.production_countries,
					release_date			: movieData.release_date,
					revenue					: movieData.revenue,
					runtime					: movieData.runtime,
					spoken_languages		: movieData.spoken_languages,
					vote_average			: movieData.vote_average,
					vote_count				: movieData.vote_count
				}
	
				setMovie(newData)

			} catch (error) {
				setLoading(false)
				setError("Algo deu errado.")
			}
		}

		getMovie()

	}, [MOVIE_URL])


	return {
		loading, 
		error,
		movie
	}
}