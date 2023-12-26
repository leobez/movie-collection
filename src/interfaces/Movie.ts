import { IGenre } from "./Genre";

export interface IMovie {
	id: number,
	genre_ids: number[], 
	genre_names: IGenre[],
	title: string,
	original_title: string,
	original_language: string,
	overview: string,
	popularity: number,
	poster_path: string,
	release_date: string,
	vote_average: number,
	vote_count: number,
}