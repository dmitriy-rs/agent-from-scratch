import type { AnyZodObject, z } from 'zod';
import type { AITool, ToolFn } from '../ai';

export interface ToolObject<TSchema extends AnyZodObject = AnyZodObject> {
    definition: AITool<TSchema>;
    fn: ToolFn<z.infer<TSchema>, string>;
}

interface ToolOptions<TSchema extends AnyZodObject = AnyZodObject> {
    name: string;
    parameters: TSchema;
    description?: string;
    fn: ToolFn<z.infer<TSchema>, string>;
}

export function createTool<TSchema extends AnyZodObject = AnyZodObject>(
    options: ToolOptions<TSchema>,
): ToolObject<TSchema> {
    const { fn, ...definition } = options;
    return {
        definition,
        fn,
    };
}
