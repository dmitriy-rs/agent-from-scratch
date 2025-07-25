import type { AnyZodObject } from 'zod';
import { runLLM } from '../../src/llm';
import type { ToolObject } from '../../src/tools/factory';
import { runEval } from '../helpers/evalTools';
import { ToolCallMatch } from '../helpers/scorers';

export async function runToolCallEval<TSchema extends AnyZodObject>(
    tool: ToolObject<TSchema>,
    input: string,
) {
    return runEval(tool.definition.name, {
        task: (input) =>
            runLLM({
                messages: [{ role: 'user', content: input }],
                tools: [tool.definition],
            }),
        data: [
            {
                input,
                expected: createToolCallMessage(tool.definition.name),
            },
        ],
        scorers: [ToolCallMatch],
    });
}

const createToolCallMessage = (toolName: string) => ({
    role: 'assistant',
    tool_calls: [
        {
            type: 'function',
            function: { name: toolName },
        },
    ],
});
