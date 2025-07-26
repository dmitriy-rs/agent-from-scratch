import { dadJoke } from '../../src/tools/dadJoke';
import { runToolCallEval } from '../helpers/toolCall';

runToolCallEval({ tool: dadJoke, input: 'tell me funny dad joke' });
