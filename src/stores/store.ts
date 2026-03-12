import { writable, derived } from "svelte/store";
import type { Conversation } from "../types/types";

export const messages = writable([]);
export const userMessages = writable([]);

export const conversations = writable<Conversation[]>([]);
export const currentConversationId = writable<number>(1);

export const currentConversation = derived(
  [conversations, currentConversationId],
  ([$conversations, $currentConversationId]) =>
    $conversations.find(c => c.conversationId === $currentConversationId)
);

export function initCurrentConversationId() {
  if (typeof localStorage !== "undefined") {
    const savedId = localStorage.getItem("currentConversationId");
    if (savedId) {
      currentConversationId.set(Number(savedId));
    }

    currentConversationId.subscribe((id) => {
      localStorage.setItem("currentConversationId", id.toString());
    });
  }
}
