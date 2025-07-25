import { dadJoke } from './dadJoke';
import type { ToolObject } from './factory';
import { generateImage } from './generateImage';
import { redditLast, redditRandom } from './reddit';

const toolsList = [
    dadJoke,
    redditRandom,
    redditLast,
    generateImage,
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

export type { ToolObject };
