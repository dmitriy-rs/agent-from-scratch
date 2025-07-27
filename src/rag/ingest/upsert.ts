import { Index as UpstashIndex } from '@upstash/vector';
import { parse } from 'csv-parse/sync';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import type { MovieMetadata, RecordBase } from '../types';

const index = new UpstashIndex({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export async function indexMovieData<TRecord extends RecordBase>(
    fileName: string,
    getMetadata: (movie: TRecord) => MovieMetadata,
) {
    const spinner = ora('Reading movie data...').start();

    const moviesPath = path.join(
        process.cwd(),
        `src/rag/ingest/data/${fileName}`,
    );
    const data = fs.readFileSync(moviesPath, 'utf-8');
    const records = parse<TRecord>(data, {
        columns: true,
        skip_empty_lines: true,
    });

    spinner.text = 'Starting movie indexing...';

    for (const movie of records.slice(8000)) {
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
