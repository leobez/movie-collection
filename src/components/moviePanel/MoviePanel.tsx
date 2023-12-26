import "./MoviePanel.css"

// Interfaces
import { IMovie } from '../../interfaces/Movie'
import { IGenre } from '../../interfaces/Genre'

import { useNavigate } from "react-router-dom"

type Props = {
	movie: IMovie
}

const imgPath = import.meta.env.VITE_IMG

const MoviePanel = ({movie}: Props) => {

	const navigate = useNavigate()

	const handleClick = ():void => {
		console.log("INDO PARA PÁGINA DO FILME: ", movie)
		navigate(`/movie/${movie.id}`)
	}

	return (
		<div className='movie_panel'>

			<div className='poster-container'>
				<img src={`${imgPath}${movie.poster_path}`} alt={`${movie.title}`} />
			</div>

			<div className='info-container'>

				<div className='title'>
					<p>
						<span>{movie.title}</span>
					</p>
				</div>

				<hr />
				
				<div className='genres'>
					<p>Gêneros: </p>
					<div>
						{movie.genre_names.map((genre:IGenre) => (
							<p key={`${movie.id}${genre.name}`}>
								<span>
									{genre.name}
								</span>	
							</p>	
						))}
					</div>
				</div>
				
				<hr />

				<div className='extra-info'>
					<div className='lang'>
						<p>Linguagem: <span>{movie.original_language.toUpperCase()}</span></p>
					</div>

					<div className='release_date'>
						<p>Lançado em: <span>{movie.release_date}</span></p>
					</div>
				</div>
				
				<div className='extra-info'>
					<div className='vote_count'>
						<p>Qtd. de votos: <span>{movie.vote_count}</span></p>
					</div>

					<div className='vote_avg'>
						<p>Média de votação: <span>{movie.vote_average.toPrecision(3)}</span></p>
					</div>
				</div>
				
				<hr />

			</div>
			
			<div className='button-container'>
				<button onClick={handleClick}>
					<span>Acessar</span>
				</button>
			</div>

		</div>
	)
}

export default MoviePanel