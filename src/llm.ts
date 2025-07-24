import { openai, type AIMessage, type AIModel, type AITool } from './ai'
import { zodFunction } from 'openai/helpers/zod'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
  tools,
}: {
  messages: AIMessage[]
  temperature?: number
  model?: AIModel
  tools: AITool[]
}): Promise<AIMessage> => {
  const formattedTools = tools.map(zodFunction)

  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  const message = response.choices[0].message
  return message
}
