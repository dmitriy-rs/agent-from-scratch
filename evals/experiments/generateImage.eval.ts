import { generateImage } from '../../src/tools/generateImage';
import { runToolCallEval } from '../helpers/toolCall';

runToolCallEval(generateImage, 'can you generate an image of a sunset');
