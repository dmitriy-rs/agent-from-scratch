import 'dotenv/config';
import { join } from 'path';

export default defineEventHandler(async (event) => {
    const evalName = getRouterParam(event, 'name')!;

    console.log('not implemented');
});
