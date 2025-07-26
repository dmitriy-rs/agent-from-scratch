import type { AnyZodObject } from 'zod';
import { runLLM } from '../../src/llm';
import type { ToolObject } from '../../src/tools/factory';
import { runEval } from '../helpers/evalTools';
import { ToolCallMatch } from '../helpers/scorers';

interface EvalCallParams<TSchema extends AnyZodObject = AnyZodObject> {
    tool: ToolObject<TSchema>;
    input: string | string[];
    name?: string
}

interface MultipleEvalCallParams {
    prompts: EvalCallParams<any>[]
    name?: string
}

export async function runToolCallEval<TSchema extends AnyZodObject>(
    params: EvalCallParams<TSchema> | MultipleEvalCallParams,
) {
    const evalTools = 'prompts' in params ? params.prompts : [params]
    const evalName = params.name ?? evalTools.reduce(
        (acc, t) => `${acc}_${t.tool.definition.name}`,
        '',
    );

    const tools = evalTools.map((t) => t.tool.definition);
    const data = evalTools.flatMap((t) =>
        createToolCallData(t.tool.definition.name, t.input),
    );

    return runEval(evalName, {
        task: (input) =>
            runLLM({
                messages: [{ role: 'user', content: input }],
                tools,
            }),
        data,
        scorers: [ToolCallMatch],
    });
}

function createToolCallData(toolName: string, input: string | string[]) {
    const inputList = Array.isArray(input) ? input : [input];

    return inputList.map((i) => ({
        input: i,
        expected: createToolCallMessage(toolName),
    }));
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
