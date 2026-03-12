import type { Conversation } from "../types/types";
import axiosClient from "./axiosClient";

export async function getAllConversations(): Promise<Record<number, Conversation>> {
  const res = await axiosClient.get(`/conversations`);
  const data = res.data;

  const converted: Record<number, Conversation> = {};
  for (const key in data) {
    converted[Number(key)] = data[key];
  }
  return converted;
}

export async function createConversation(conversationName: string): Promise<Conversation> {
  const res = await axiosClient.post("/conversation", { conversationName });
  return res.data;
}

export async function deleteConversation(conversationId: number) {
  const res = await axiosClient.delete(`/conversation/${conversationId}`);
  return res.data;
}
