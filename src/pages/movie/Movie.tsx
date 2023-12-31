import { useParams } from "react-router-dom"
import "./Movie.css"
import { useGetMovie } from "../../hooks/useGetMovie"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const imgPath = import.meta.env.VITE_IMG

const Movie = () => {

	const params:any = useParams()
	const id:string = params.id
	
	const MOVIE_URL = `${moviesURL}${id}?${apiKey}`

	const {loading, error, movie} = useGetMovie(MOVIE_URL)

	return (
		<div className="movie">
			<div className="movie-container">
				{movie && 
					<>
						<div className="poster_path">
							<img src={`${imgPath}${movie.poster_path}`} alt={`${movie.id}`} />
						</div>

						<div className="original_title">
							<p>{movie.original_title}</p>
						</div>

						<div className="original_language">
							<p>Linguagem original:</p>
							<p className="bold">{movie.original_language.toUpperCase()}</p>
						</div>

						<div className="votes">
							<table>
								<tbody>
									<tr>
										<th>Contagem de votos</th>
										<th>Nota média</th>
										<th>Popularidade</th>
									</tr>
									<tr>
										<td>
											<p>{movie.vote_count}</p>
										</td>
										<td>
											<p>{movie.vote_average.toPrecision(3)}</p>
										</td>
										<td>
											<p>{movie.popularity}</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					
						<div className="genres">
							<p>Gêneros: </p>
							{
								movie.genres.map((genre) => (
									<div key={genre.id}><p className="bold">{genre.name}</p></div>
								))
							}
						</div>

						<div className="release_date">
							<p>Data de lançamento: </p>
							<p className="bold">{movie.release_date}</p>
						</div>					

						<div className="overview">
							<hr />
							<p>{movie.overview}</p>
							<hr />
						</div>

						<div className="production">

							<div className="runtime">
								<p>Duração:</p>
								<p className="bold">{movie.runtime} min</p>
							</div>

							<div className="budget">
								<p>Orçamento:</p>
								<p className="bold">R$ {movie.budget}</p>
							</div>

							<div className="revenue">
								<p>Receita:</p>
								<p className="bold">R$ {movie.revenue}</p>
							</div> 

							<div className="production_companies">
								<div className="title">Companias na produção: </div>
								{movie.production_companies.map((prod:any) => (
									<div key={prod.id}><p>{prod.name}</p></div>
								))}
							</div>
							<div className="production_countries">
								<div className="title">Países na produção: </div>
								{movie.production_countries.map((country:any) => (
									<div key={country.iso_3166_1}><p>{country.name}</p></div>
								))}
							</div>
						</div>
					</>
				}
			</div>

			{/* BUTTON, LOADING, ERROR */}
			<div className='extra-container'>
				{loading && <div><p>Carregando...</p></div>}
				{error && <div className='msg_container'><p>{error}</p></div>}
			</div>

		</div>
	)
}

export default Movie