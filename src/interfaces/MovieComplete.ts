import { IGenre } from "./Genre";

export interface IMovieComplete {

	budget: number,
	genres: IGenre[],
	id: number, 
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string,
	production_companies: any,
	production_countries: any,
	release_date: string,
	revenue: number,
	runtime: number,
	spoken_languages: any,
	vote_average: number,
	vote_count: number
}