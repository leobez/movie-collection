import "./Footer.css"

const Footer = () => {
	return (
		<div className='Footer'>

			<p>Biblioteca de filmes</p>

			<div>
				<p>Imagens e textos através de </p> 

				<a href="https://developer.themoviedb.org/docs" target="_blank">
					<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
					alt="tmdb-logo" 
					/>
				</a>
			</div>

		</div>
	)
}

export default Footer