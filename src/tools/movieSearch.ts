import { z } from 'zod';
import { createTool, formatToolResponse } from './factory';
import { queryMovies } from '../rag/query';

export const movieSearch = createTool({
    name: 'movie_search',
    parameters: z.object({
        query: z.string().describe('The search query for finding movies'),
        genre: z
            .union([z.string(), z.null()])
            .nullable()
            .describe('Filter movies by genre'),
        director: z
            .union([z.string(), z.null()])
            .nullable()
            .describe('Filter movies by director'),
        actor: z
            .union([z.string(), z.null()])
            .nullable()
            .describe('Filter movies by actor'),
        // year: z.number().optional().nullable().describe('Filter movies by year'),
    }),
    description:
        'Searches for movies and information about them, including title, year, genre, director, actors, rating, and description. Use this to answer questions about movies.',
    fn: async ({ toolArgs }) => {
        const { query, actor, director, genre } = toolArgs;

        const filters = {
            ...(genre && { genre }),
            ...(director && { director }),
            ...(actor && { actors: actor }),
            // ...(year && { year }),
        };

        let results;
        try {
            results = await queryMovies({ query, filters });
        } catch (e) {
            console.error(e);
            return 'Error: Could not query the db to get movies';
        }

        const formattedResults = results.map(({ metadata, data }) => ({
            title: metadata?.title,
            year: metadata?.year,
            genre: metadata?.genre,
            director: metadata?.director,
            actors: metadata?.actors,
            rating: metadata?.rating,
            metascore: metadata?.metascore,
            duration: metadata?.duration,
            certificate: metadata?.certificate,
            description: data,
        }));

        return formatToolResponse(formattedResults);
    },
});
