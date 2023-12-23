import { useEffect, useState } from "react"
import { IGenre } from "../interfaces/Genre"

const genreURL = import.meta.env.VITE_GENRE

export const useGetGenres = () => {

	const [loading, setLoading] 			= useState<boolean>(false)
	const [error, setError] 				= useState<string>("")
	const [listOfGenres, setListOfGenres] 	= useState<IGenre[]|null>(null)

	useEffect(() => {
		const getGenres = async():Promise<void> => {
			try {

				setLoading(true)
				const data = await fetch(genreURL)
					.then(res => res.json())
					.catch(err => err)

				setListOfGenres(data.genres)
				setLoading(false)

			} catch (error) {
				setLoading(false)
				setError("Algo deu errado.")
			}
		}
		getGenres()
	}, [])

	return {
		loading,
		error, 
		listOfGenres
	}

}