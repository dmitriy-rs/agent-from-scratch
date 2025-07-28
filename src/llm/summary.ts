import { runLLM } from './run';
import type { AIMessage } from '../ai';
import type {
    ChatCompletionContentPartRefusal,
    ChatCompletionContentPartText,
} from 'openai/resources';

export const summarizeMessages = async (messages: AIMessage[]) => {
    const response = await runLLM({
        systemPrompt:
            'Summarize the key points of the conversation in a concise way that would be helpful as context for future interactions. Make it like a play by play of the conversation.',
        messages,
        temperature: 0.3,
    });

    return getTextResult(response.content);
};

function getTextResult(
    content?:
        | string
        | (ChatCompletionContentPartText | ChatCompletionContentPartRefusal)[]
        | null,
) {
    if (!content) {
        return '';
    }
    if (typeof content === 'string') {
        return content;
    }
    let result = '';
    for (const part of content) {
        if (part.type === 'text') {
            result += part.text;
        } else {
            console.error(`[Error] LLM Refusal: ${part.refusal}`);
            return '';
        }
    }
    return result;
}
