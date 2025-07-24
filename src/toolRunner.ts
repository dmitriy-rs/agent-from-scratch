import type { ToolCall } from './ai'
import { getToolByName } from './tools'

export async function runTool(toolCall: ToolCall, userPrompt: string) {
  const input = {
    userPrompt,
    toolArgs: JSON.parse(toolCall.function.arguments),
  }

  const tool = getToolByName(toolCall.function.name)
  if (!tool) {
    throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }

  return tool.fn(input)
}
