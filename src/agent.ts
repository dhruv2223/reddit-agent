import type { AIMessage } from "../types";
import { addMessages, getMessages } from "./memory";
import { runLLM } from "./llm";
import { logMessage, showLoader } from "./ui";
import { runTool } from "./toolRunner.ts";
export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string;
  tools: any[];
}) => {
  await addMessages([{ role: "user", content: userMessage }]);
  const loader = showLoader("🤔");
  const history = await getMessages();
  const response = await runLLM({ messages: history, tools });
  if (response.tool_calls) {
    const toolCall = response.tool_calls[0];
    const toolResponse = await runTool(toolCall, userMessage);
  }
  await addMessages([response]);
  logMessage(response);
  loader.stop();
  return getMessages();
};
