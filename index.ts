import "dotenv/config";
import { runLLM } from "./src/llm";
import { getMessages, addMessages } from "./src/memory.ts";
import { runAgent } from "./src/agent.ts";
import { z } from "zod";
const userMessage = process.argv[2];

if (!userMessage) {
  console.error("Please provide a message");
  process.exit(1);
}
const weatherTool = {
  name: "get_stuff",
  description: "don't use this to get the weather",
  parameters: z.object({
    reasoning: z.string().describe("hey why did you pick this tool?"),
  }),
};

const response = await runAgent({ userMessage, tools: [weatherTool] });
console.log(response);
