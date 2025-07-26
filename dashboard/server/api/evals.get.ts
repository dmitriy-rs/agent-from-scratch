import { join } from 'path';

export default defineEventHandler(async (event) => {
    try {
        // Import the JavaScript bridge
        const evalBridge = await import(
            join(process.cwd(), '..', 'evals', 'bridge.js')
        );

        // Get list of available evals
        const availableEvals = await evalBridge.listAvailableEvals();

        return {
            success: true,
            evals: availableEvals,
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage:
                error instanceof Error ? error.message : 'Failed to list evals',
        });
    }
});
