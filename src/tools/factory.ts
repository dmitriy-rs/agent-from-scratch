import type { ZodObject, z } from "zod";
import type { AITool, ToolFn } from "../ai";

export interface ToolReturn<TSchema extends ZodObject = ZodObject> {
  definition: AITool<TSchema>;
  fn: ToolFn<z.infer<TSchema>, string>;
}

interface ToolOptions<TSchema extends ZodObject = ZodObject> {
  name: string;
  parameters: TSchema;
  description?: string;
  fn: ToolFn<z.infer<TSchema>, string>;
}

export function createTool<TSchema extends ZodObject = ZodObject>(
  options: ToolOptions<TSchema>,
): ToolReturn<TSchema> {
  const { fn, ...definition } = options;
  return {
    definition,
    fn,
  };
}
