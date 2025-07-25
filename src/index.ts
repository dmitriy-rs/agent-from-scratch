import 'dotenv/config';
import { runAgent } from './agent';
import { getToolsList } from './tools';

const userPrompt = process.argv[2];

if (!userPrompt) {
    console.error('Please provide a message');
    process.exit(1);
}

await runAgent({
    userPrompt,
    tools: getToolsList(),
});
