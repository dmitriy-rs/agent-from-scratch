import { dadJoke } from './dadJoke'
import type { ToolReturn } from './factory'
import { redditLast, redditRandom } from './reddit'

const toolsList = [dadJoke,redditRandom, redditLast, ] as ToolReturn[]

const toolsMap = toolsList.reduce(
  (acc, tool) => ({ ...acc, [tool.definition.name]: tool }),
  {} as Record<string, ToolReturn>
)

export function getToolByName(name: string) {
  return toolsMap[name]
}

export function getToolsList() {
  return toolsList.map((t) => t.definition)
}
