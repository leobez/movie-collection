import React, { useState } from 'react'
import "./SearchBar.css"

type Props = {}

const SearchBar = (props: Props) => {

	const [query, setQuery] = useState("")

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()
		console.log("Pesquisa, query: ", query)
	}

	return (
		<div className='searchbar'>

			<form onSubmit={handleSubmit}>

				<input 
					type="text" 
					name='query' 
					placeholder='Ex.: autor' 
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>

				<input type='submit' value="Pesquisar"/>

			</form>
		</div>
	)
}

export default SearchBar