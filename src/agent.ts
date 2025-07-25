import { getToolMessage, type AITool } from "./ai";
import { runLLM } from "./llm";
import { addMessage, getMessages } from "./memory";
import { runTool } from "./toolRunner";
import { logMessage, showLoader } from "./ui";

export async function runAgent({
  tools,
  userPrompt,
}: {
  userPrompt: string;
  tools: AITool[];
}) {
  await addMessage({
    role: "user",
    content: userPrompt,
  });

  const loader = showLoader("Thinking...");

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

    if ("tool_calls" in response && response.tool_calls) {
      const toolCall = response.tool_calls[0];
      loader.update(`Executing: ${toolCall.function.name}`);

      const toolResponse = await runTool(toolCall, userPrompt);
      await addMessage(getToolMessage(toolCall.id, toolResponse));

      loader.update(`done: ${toolCall.function.name}`);
    }
  }
}
