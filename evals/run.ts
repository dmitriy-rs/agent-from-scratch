import 'dotenv/config';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readdir } from 'fs/promises';

const evalName = process.argv[2];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const experimentsDir = join(__dirname, 'experiments');

export async function runEval(experimentsDir: string, evalName?: string) {
    try {
        if (evalName) {
            const evalPath = join(experimentsDir, `${evalName}.eval.ts`);
            await import(evalPath);
        } else {
            const files = await readdir(experimentsDir);
            const evalFiles = files.filter((file) => file.endsWith('.eval.ts'));

            for (const evalFile of evalFiles) {
                const evalPath = join(experimentsDir, evalFile);
                await import(evalPath);
            }
        }
    } catch (error) {
        console.error(
            `Failed to run eval${evalName ? ` '${evalName}'` : 's'}:`,
            error,
        );
        process.exit(1);
    }
}

runEval(experimentsDir, evalName);
