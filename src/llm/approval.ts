import { openai } from '../ai';
import { zodResponseFormat } from 'openai/helpers/zod';
import z from 'zod';

export const runApprovalCheck = async (
    toolName: string,
    userMessage: string,
) => {
    const toolsToApproveLabel = getToolNameApprovalLabel(toolName);

    const response = await openai.chat.completions.parse({
        model: 'gpt-4o-mini',
        temperature: 0.1,
        response_format: zodResponseFormat(
            z.object({
                approved: z
                    .boolean()
                    .describe('did the user say they approved or not'),
            }),
            'approval',
        ),
        messages: [
            {
                role: 'system',
                content: `Determine if the user approved the ${toolsToApproveLabel}. If you are not sure, then it is not approved.`,
            },
            { role: 'user', content: userMessage },
        ],
    });

    return !!response.choices[0].message.parsed?.approved;
};

function getToolNameApprovalLabel(toolName: string) {
    switch (toolName) {
        case 'generate_image':
            return 'image generation';
        default:
            return 'action that LLM will do for him';
    }
}
