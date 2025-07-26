import { z } from 'zod';
import { createTool } from './factory';

export const dadJoke = createTool({
    name: 'dad_joke',
    parameters: z.object({}),
    description: 'get a dad joke',
    fn: async () => {
        const res = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = (await res.json()) as { joke: string };
        return data.joke;
    },
});
