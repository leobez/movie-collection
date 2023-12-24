import { useState } from "react"
import { IMovie } from "../interfaces/Movie"
import { IGenre } from "../interfaces/Genre"

export const useGet = () => {

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>("")

	const getData = async(url: string):Promise<any> => {
		
		try {
		
			setLoading(true)
			const res = await fetch(url)
			const data = await res.json()
			setLoading(false)

			return data;

		} catch (error) {
			setLoading(false)
			setError("Algo deu errado")
		}

		return;
	}
	
	return {
		loading,
		error, 
		getData
	}
}