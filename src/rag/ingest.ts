import 'dotenv/config';
import { Index as UpstashIndex } from '@upstash/vector';
import { parse } from 'csv-parse/sync';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import type {
    MovieMetadata,
    Record1000,
    Record10k,
    RecordBase,
    RecordTop1000,
} from './types';

const index = new UpstashIndex({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

async function indexMovieData<TRecord extends RecordBase>(
    fileName: string,
    getMetadata: (movie: TRecord) => MovieMetadata,
) {
    const spinner = ora('Reading movie data...').start();

    const moviesPath = path.join(process.cwd(), `src/rag/${fileName}`);
    const data = fs.readFileSync(moviesPath, 'utf-8');
    const records = parse<TRecord>(data, {
        columns: true,
        skip_empty_lines: true,
    });

    spinner.text = 'Starting movie indexing...';

    for (const movie of records) {
        spinner.text = `Indexing movie: ${movie.Title}`;
        const text = `${movie.Title}. ${movie.Genre}. ${movie.Description}`;

        try {
            await index.upsert<MovieMetadata>({
                id: movie.Title,
                data: text,
                metadata: getMetadata(movie),
            });
        } catch (error) {
            spinner.fail(`Error indexing movie ${movie.Title}`);
            console.error(error);
        }
    }

    spinner.succeed('Finished indexing movie data');
}

function toNumber(v: string) {
    return Number(v.replaceAll(',', ''));
}

function toMillions(v: string) {
    return Number((toNumber(v) / 1_000_000).toFixed(2));
}

// .slice(8000)
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
// }))

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
