import 'dotenv/config';
import type { Record1000, Record10k, RecordTop1000 } from '../types';
import { toNumber, toMillions } from './utils';
import { indexMovieData } from './upsert';

// await indexMovieData<Record10k>('imdb_movie_dataset_10k.csv', (movie) => ({
//     title: movie.Title,
//     year: Number(movie.Year),
//     genre: movie.Genre,
//     director: movie.Director,
//     actors: movie.Cast,
//     rating: Number(movie.Rating),
//     votes: toNumber(movie.Votes),
//     revenue: undefined,
//     metascore: Number(movie.Metascore),
//     certificate: movie.Certificate,
//     poster: movie.Poster,
//     duration: Number(movie['Duration (min)']),
//     reviews: toNumber(movie['Review Count']),
// }));

// await indexMovieData<RecordTop1000>('imdb_top_1000.csv', (movie) => ({
//     title: movie.Title,
//     year: Number(movie.Released_Year),
//     genre: movie.Genre,
//     director: movie.Director,
//     actors: [movie.Star1, movie.Star2, movie.Star3, movie.Star4].join(','),
//     rating: Number(movie.IMDB_Rating),
//     votes: Number(movie.No_of_Votes),
//     revenue: toMillions(movie.Gross),
//     metascore: Number(movie.Meta_score),
//     certificate: movie.Certificate,
//     poster: movie.Poster_Link,
//     duration: Number(movie.Runtime.split(' ')[0]),
//     reviews: undefined,
// }));

// await indexMovieData<Record1000>('imdb_movie_dataset.csv', (movie) => ({
//     title: movie.Title,
//     year: Number(movie.Year),
//     genre: movie.Genre,
//     director: movie.Director,
//     actors: movie.Actors,
//     rating: Number(movie.Rating),
//     votes: Number(movie.Votes),
//     revenue: Number(movie['Revenue (Millions)']),
//     metascore: Number(movie.Metascore),
//     certificate: undefined,
//     poster: undefined,
//     duration: Number(movie['Runtime (Minutes)']),
//     reviews: undefined,
// }))
