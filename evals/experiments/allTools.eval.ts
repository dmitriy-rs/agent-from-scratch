import { dadJoke } from '../../src/tools/dadJoke';
import { generateImage } from '../../src/tools/generateImage';
import { redditLatest, redditRandom } from '../../src/tools/reddit';
import { runToolCallEval } from '../helpers/toolCall';

runToolCallEval<any>({
    name: 'all_tools',
    prompts: [
        {
            input: 'tell me something interesting from reddit',
            tool: redditRandom,
        },
        {
            input: 'what is most upvoted post on reddit',
            tool: redditLatest,
        },
        {
            input: 'take a photo of Mars',
            tool: generateImage,
        },
        {
            input: 'tell me a funny dad joke',
            tool: dadJoke,
        },
        // {
        //   input: 'what movies did Christopher Nolan direct?',
        //   expected: createToolCallMessage(movieSearchToolDefinition.name),
        // },
    ],
});
