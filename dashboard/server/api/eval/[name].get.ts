import 'dotenv/config';
import { join } from 'path';
import { runRedditEval } from '../../../../evals';

export default defineEventHandler(async (event) => {
    const evalName = getRouterParam(event, 'name')!;
    const experimentsDir = join(process.cwd(), '..', 'evals', 'experiments');

    await runRedditEval();
});
