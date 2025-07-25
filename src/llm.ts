import { openai, type AIMessage, type AIModel, type AITool } from './ai';
import { zodFunction } from 'openai/helpers/zod';
import { getSystemPrompt } from './systemPrompt';

export async function runLLM({
    model = 'gpt-4o-mini',
    messages,
    temperature = 0.1,
    tools,
}: {
    messages: AIMessage[];
    temperature?: number;
    model?: AIModel;
    tools: AITool[];
}): Promise<AIMessage> {
    const formattedTools = tools.map(zodFunction);

    const response = await openai.chat.completions.create({
        model,
        messages: [{ role: 'system', content: getSystemPrompt() }, ...messages],
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
        size: '512x512',
    });

    return response.data?.[0].url;
}
