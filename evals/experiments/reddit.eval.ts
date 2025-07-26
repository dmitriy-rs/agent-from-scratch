import { redditLastest, redditRandom } from '../../src/tools/reddit';
import { runToolCallEval } from '../helpers/toolCall';

runToolCallEval({
    tool: redditLastest,
    input: 'get me latest post from rule34',
});

runToolCallEval({
    tool: redditRandom,
    input: 'tell me something cool from reddit',
});
