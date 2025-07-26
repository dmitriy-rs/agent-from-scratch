import { getToolMessage, type AIMessage, type AITool } from './ai';
import { runApprovalCheck, runLLM } from './llm';
import { addMessage, getMessages } from './memory';
import { runTool } from './toolRunner';
import { isToolNeedApproval } from './tools';
import { logMessage, showLoader } from './ui';

export async function runAgent({
    tools,
    userPrompt,
}: {
    userPrompt: string;
    tools: AITool[];
}) {
    const history = await getMessages();
    const isImageApproval = await handleImageApprovalFlow(history, userPrompt);

    if (!isImageApproval) {
        await addMessage({ role: 'user', content: userPrompt });
    }

    const loader = showLoader('🤔');

    while (true) {
        const history = await getMessages();

        const response = await runLLM({
            messages: history,
            tools,
        });

        await addMessage(response);
        logMessage(response);

        if (response.content) {
            loader.stop();
            return;
        }

        if ('tool_calls' in response && response.tool_calls) {
            const toolCall = response.tool_calls[0];
            loader.update(`Executing: ${toolCall.function.name}`);

            if (isToolNeedApproval(toolCall.function.name)) {
                loader.update('need user approval');
                loader.stop();
                return;
            }

            const toolResponse = await runTool(toolCall, userPrompt);
            await saveToolResponse(toolCall.id, toolResponse);

            loader.update(`done: ${toolCall.function.name}`);
        }
    }
}

const handleImageApprovalFlow = async (
    history: AIMessage[],
    userMessage: string,
) => {
    const lastMessage = history[history.length - 1];
    if (!lastMessage) {
        return false
    }

    const toolCall =
        'tool_calls' in lastMessage && lastMessage?.tool_calls?.[0];

    if (!toolCall || !isToolNeedApproval(toolCall.function.name)) {
        return false;
    }

    const loader = showLoader('Processing approval...');
    const approved = await runApprovalCheck(userMessage);

    if (approved) {
        loader.update(`executing tool: ${toolCall.function.name}`);
        const toolResponse = await runTool(toolCall, userMessage);

        loader.update(`done: ${toolCall.function.name}`);
        await saveToolResponse(toolCall.id, toolResponse);
    } else {
        await saveToolResponse(
            toolCall.id,
            'User did not approve image generation at this time.',
        );
    }

    loader.stop();

    return true;
};

async function saveToolResponse(toolCallId: string, toolResponse: string) {
    return addMessage(getToolMessage(toolCallId, toolResponse));
}
