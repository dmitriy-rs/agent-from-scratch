import { dadJoke } from './dadJoke';
import type { ToolObject } from './factory';
import { generateImage } from './generateImage';
import { movieSearch } from './movieSearch';
import { redditLastest, redditRandom } from './reddit';

const toolsList = [
    dadJoke,
    redditRandom,
    redditLastest,
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
    // return toolName === generateImage.definition.name;
    return false
}

export type { ToolObject };
