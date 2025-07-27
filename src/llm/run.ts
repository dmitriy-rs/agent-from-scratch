import { openai, type AIMessage, type AIModel, type AITool } from '../ai';
import { zodFunction } from 'openai/helpers/zod';
import { getSystemPrompt } from '../systemPrompt';
import { getSummary } from '../memory';

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
