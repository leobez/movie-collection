import { useParams } from "react-router-dom"
import "./Movie.css"
import { useEffect, useState } from "react"
import { IMovieComplete } from "../../interfaces/MovieComplete"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const imgPath = import.meta.env.VITE_IMG

const Movie = () => {

	const params:any = useParams()

	const [movie, setMovie] = useState<IMovieComplete|null>(null)

	const getMovie = async(id: string):Promise<void> => {

		try {
			const url = `${moviesURL}${id}?${apiKey}`
			const res = await fetch(url)
			const data = await res.json()


			const newData:IMovieComplete = {
				budget					: data.budget,
				genres					: data.genres,
				id						: data.id, 
				original_language		: data.original_language,
				original_title			: data.original_title,
				overview				: data.overview,
				popularity				: data.popularity,
				poster_path				: data.poster_path,
				production_companies	: data.production_companies,
				production_countries	: data.production_countries,
				release_date			: data.release_date,
				revenue					: data.revenue,
				runtime					: data.runtime,
				spoken_languages		: data.spoken_languages,
				vote_average			: data.vote_average,
				vote_count				: data.vote_count
			}

			console.log(newData)

			setMovie(newData)

		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getMovie(params.id)
	}, [])


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
		</div>
	)
}

export default Movie