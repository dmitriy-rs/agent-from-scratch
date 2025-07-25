import { redditLast, redditRandom } from '../../src/tools/reddit';
import { runToolCallEval } from '../helpers/toolCall';

runToolCallEval(redditLast, 'get me latest post from rule34');

runToolCallEval(redditRandom, 'tell me something cool from reddit');
