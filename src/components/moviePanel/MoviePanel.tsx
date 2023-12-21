import "./MoviePanel.css"

// Interfaces
import { IMovie } from '../../interfaces/Movie'

type Props = {
	movie: IMovie
}

const imgPath = import.meta.env.VITE_IMG

const MoviePanel = ({movie}: Props) => {

	return (
		<div className='movie_panel'>

			<div className='poster_path'>
				<img src={`${imgPath}${movie.poster_path}`} alt={`${movie.title}`} />
			</div>

			<div className='info'>

				<div className='title'>
					{movie.original_title === movie.title ? (
						<p><span>{movie.title}</span></p>
					) : (
						<>
							<p><span>{movie.original_title}</span></p>
							<hr />
							<p><span>{movie.title}</span></p>
						</>
					)}
				</div>

				<hr />

				<div className='genres'>

					<p>Gêneros: </p>

					<div>
						{movie.genre_names.map(genre => (
							<p>
								<span>
									{genre}
								</span>	
							</p>	
						))}
					</div> 

				</div>

				<div className="extra-info">
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

			<button><span>Acessar</span></button>

		</div>
	)
}

export default MoviePanel