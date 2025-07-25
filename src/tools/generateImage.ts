import { z } from 'zod'
import { createTool } from './factory'
import { generateImageLLM } from '../llm'

export const generateImage = createTool({
  name: 'generate_image',
  parameters: z
    .object({
      prompt: z
        .string()
        .describe(
          "prompt to generate the image. Be sure to consider the user's original message when making a prompt. If you are unsure then ask the user to provide more details."
        ),
    })
    .describe('Generates an image and returns the url of the image.'),
  description: 'generate an image',
  fn: async ({ toolArgs: { prompt } }) => {
    const imageUrl = await generateImageLLM(prompt)
    return imageUrl!
  },
})
