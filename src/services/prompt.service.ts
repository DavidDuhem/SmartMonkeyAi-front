import axiosClient from "./axiosClient";

export async function sendPrompt(conversationId: number, prompt: string): Promise<string> {
  const res = await axiosClient.post("/ask", { conversationId, prompt });
  return res.data.content;
}