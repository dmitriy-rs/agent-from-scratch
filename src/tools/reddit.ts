import { z } from 'zod';
import { createTool, formatToolResponse } from './factory';

const parameters = z
    .object({
        subreddit: z
            .string()
            .describe('The name of the subreddit provided from user'),
    })
    .describe(
        'It will return a JSON object with the title, link, subreddit, author, and upvotes of each post.',
    );

export const redditLastest = createTool({
    name: 'reddit_lastest',
    description: 'Use this tool to get the latest posts from Reddit.',
    parameters,
    fn: async ({ toolArgs }) => {
        const res = redditFetcher(toolArgs);
        return res.then(mapToolResponse);
    },
});

export const redditRandom = createTool({
    name: 'reddit_random',
    description:
        'Use this tool to get the random posts from Reddit. Pick needed post from the provided list',
    parameters,
    fn: async ({ toolArgs }) => {
        const res = redditFetcher(toolArgs);
        return res.then(mapToolResponse);
    },
});

type RedditResponse = { data: any };

async function redditFetcher({ subreddit }: { subreddit?: string | null }) {
    const url = subreddit
        ? `https://www.reddit.com/r/${subreddit}/.json`
        : `https://www.reddit.com/.json`;
    return (await fetch(url).then((res) => res.json())) as RedditResponse;
}

function mapToolResponse(res: RedditResponse): string {
    const relevantInfo = res.data.children.map((child: any) => ({
        title: child.data.title,
        link: child.data.url,
        subreddit: child.data.subreddit_name_prefixed,
        dominantColor: child.data.link_flair_background_color,
        permalink: child.data.permalink,
        nsfw: child.data.over_18,
    }));

    return formatToolResponse(relevantInfo);
}
