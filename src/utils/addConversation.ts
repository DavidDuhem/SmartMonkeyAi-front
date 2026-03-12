    
    import { conversations, currentConversationId } from '../stores/store';
    import { createConversation, deleteConversation } from "../services/conversation.service";
    
    export async function addConversation(name : string){
        try {
            const newConv = await createConversation(name);
            conversations.update(list => [...list, newConv]);
            currentConversationId.set(newConv.conversationId);
        } catch (err) {
            console.error("Erreur lors de la création de la conversation :", err);
        }
    }