import { Index as UpstashIndex } from '@upstash/vector';
import type { MovieMetadata } from './types';

const index = new UpstashIndex({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export async function queryMovies({
    query,
    filters,
    topK = 5,
}: {
    query: string;
    filters: Partial<MovieMetadata>;
    topK?: number;
}) {
    let filterStr = '';
    if (filters) {
        const filterParts = Object.entries(filters)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `${key}='${value}'`);

        if (filterParts.length > 0) {
            filterStr = filterParts.join(' AND ');
        }
    }

    const results = await index.query<MovieMetadata>({
        data: query,
        filter: filterStr,
        topK,
        includeMetadata: true,
        includeData: true,
    });

    return results;
}
