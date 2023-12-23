import { useEffect, useState } from "react"
import { IMovie } from "../interfaces/Movie"
import { IGenre } from "../interfaces/Genre"
import { useGetGenres } from "./useGetGenres"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export const useGetMovies = (initialPage: number) => {

	const {listOfGenres} = useGetGenres()

	const [loading, setLoading] 			= useState<boolean>(false)
	const [error, setError] 				= useState<string>("")
	const [listOfMovies, setListOfMovies] 	= useState<IMovie[]|null>(null)
	const [page, setPage] 					= useState<number>(initialPage)

	useEffect(() => {

		const getMovies = async(page: number):Promise<void> => {

			try {
				const topRatedUrl = `${moviesURL}top_rated?${apiKey}&page=${page}`
				const res = await fetch(topRatedUrl)
				const data = await res.json()

				console.log("MOVIES: ", data)
				console.log("GENRES: ", listOfGenres)

			} catch (error) {
				setError("Algo deu errado")
			}
		}

		getMovies(page)

	}, [page])


	return {
		listOfMovies,
		loading,
		error,
		setPage
	}
}