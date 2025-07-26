import { openai, type AIMessage, type AIModel, type AITool } from './ai';
import { zodFunction, zodResponseFormat } from 'openai/helpers/zod';
import { getSystemPrompt } from './systemPrompt';
import z from 'zod';
import { getSummary } from './memory';

export async function runLLM({
    model = 'gpt-4o-mini',
    messages,
    temperature = 0.1,
    tools = [],
    systemPrompt,
}: {
    messages: AIMessage[];
    temperature?: number;
    model?: AIModel;
    tools?: AITool[];
    systemPrompt?: string;
}): Promise<AIMessage> {
    const formattedTools = tools.map(zodFunction);

    const summary = await getSummary();
    const systemPromptContent =
        systemPrompt ??
        `${getSystemPrompt()}. Conversation summary so far: ${summary}`;

    const response = await openai.chat.completions.create({
        model,
        messages: [
            { role: 'system', content: systemPromptContent },
            ...messages,
        ],
        temperature,
        tools: formattedTools,
        tool_choice: 'auto',
        parallel_tool_calls: false,
    });

    const message = response.choices[0].message;
    return message;
}

export async function generateImageLLM(prompt: string) {
    const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
    });

    return response.data?.[0].url;
}

export const runApprovalCheck = async (userMessage: string) => {
    const response = await openai.chat.completions.parse({
        model: 'gpt-4o-mini',
        temperature: 0.1,
        response_format: zodResponseFormat(
            z.object({
                approved: z
                    .boolean()
                    .describe('did the user say they approved or not'),
            }),
            'math_reasoning',
        ),
        messages: [
            {
                role: 'system',
                content:
                    'Determine if the user approved the image generation. If you are not sure, then it is not approved.',
            },
            { role: 'user', content: userMessage },
        ],
    });

    return response.choices[0].message.parsed?.approved;
};

export const summarizeMessages = async (messages: AIMessage[]) => {
    const response = await runLLM({
        systemPrompt:
            'Summarize the key points of the conversation in a concise way that would be helpful as context for future interactions. Make it like a play by play of the conversation.',
        messages,
        temperature: 0.3,
    });

    return (response.content as string) || '';
};
