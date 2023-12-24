import React, { useState } from 'react'
import "./SearchBar.css"
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {

	const [query, setQuery] = useState("")
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()
		if (query.trim() === "") return navigate("/")
		return navigate(`/search?q=${query}`)
	}

	return (
		<div className='searchbar'>

			<form onSubmit={handleSubmit}>
				<input 
					type="text" 
					name='query' 
					placeholder='Ex.: avengers' 
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>
				<input type='submit' value='Pesquisar'/>
			</form>

		</div>
	)
}

export default SearchBar