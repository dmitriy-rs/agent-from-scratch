import { runLLM } from './run';
import type { AIMessage } from '../ai';

export const summarizeMessages = async (messages: AIMessage[]) => {
    const response = await runLLM({
        systemPrompt:
            'Summarize the key points of the conversation in a concise way that would be helpful as context for future interactions. Make it like a play by play of the conversation.',
        messages,
        temperature: 0.3,
    });

    return (response.content as string) || '';
};
