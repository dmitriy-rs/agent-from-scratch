import OpenAI from 'openai'
import type { AnyZodObject } from 'zod';

export const openai = new OpenAI()

export type AIModel = OpenAI.Chat.ChatModel

export type AIMessage =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }

export type AITool<TSchema extends AnyZodObject = AnyZodObject> = {
  name: string
  parameters: TSchema
  description?: string
}

export type ToolCall = OpenAI.Chat.Completions.ChatCompletionMessageToolCall

export interface ToolFn<A = void, T = string> {
  (input: { userPrompt: string; toolArgs: A }): Promise<T>
}

export function getToolMessage(toolCallId: string, toolResponse: string): AIMessage {
  return {
    role: 'tool',
    content: toolResponse,
    tool_call_id: toolCallId
  }
}