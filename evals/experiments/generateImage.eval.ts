import { generateImage } from '../../src/tools/generateImage';
import { runToolCallEval } from '../helpers/toolCall';

runToolCallEval({
    tool: generateImage,
    input: [
        'can you generate an image of a sunset',
        'generate a deep scary forest',
        'take a photo of sunset',
    ],
});
