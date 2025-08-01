import { dadJoke } from './dadJoke';
import type { ToolObject } from './factory';
import { generateImage } from './generateImage';
import { movieSearch } from './movieSearch';
import { redditLatest, redditRandom } from './reddit';

const toolsList = [
    dadJoke,
    redditRandom,
    redditLatest,
    generateImage,
    movieSearch,
] as ToolObject[];

const toolsMap = toolsList.reduce(
    (acc, tool) => ({ ...acc, [tool.definition.name]: tool }),
    {} as Record<string, ToolObject>,
);

export function getToolByName(name: string) {
    return toolsMap[name];
}

export function getToolsList() {
    return toolsList.map((t) => t.definition);
}

export function isToolNeedApproval(toolName: string) {
    return toolName === generateImage.definition.name;
}

export type { ToolObject };
