import type { AIMessage } from "../types";
import { openai } from "./ai";
import { zodFunction } from "openai/helpers/zod";
export const runLLM = async ({
  model = "gemini-1.5-flash",
  messages,
  temperature = 0.1,
  tools,
}: {
  messages: AIMessage[];
  temperature?: number;
  model?: string;
  tools: any[];
}) => {
  const formattedTools = tools.map(zodFunction);
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    tools: formattedTools,
    tool_choice: "auto",
    parallel_tool_calls: false,
  });
  return response.choices[0].message;
};
