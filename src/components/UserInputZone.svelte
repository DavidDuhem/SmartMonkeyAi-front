<script lang="ts">
    import AddButton from "./AddButton.svelte";
    import AddModal from "./AddModale.svelte";
    import { SendHorizontal } from "lucide-svelte";
    import { currentConversationId, conversations } from '../stores/store';
    import { sendPrompt } from "../services/prompt.service";
    import type { Message } from "../types/types";
    import { addConversation } from "../utils/addConversation";

    let showModal = false;
    let textarea: HTMLTextAreaElement | null = null;
    let textareaValue = "";
    const originHeight = 2.5;

    const resizeTextarea = () => {
        if (!textarea) return;
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.marginBottom = `calc(${textarea.scrollHeight}px - ${originHeight}rem)`;
    };

    function handleSubmit(event: SubmitEvent)
    {
        event.preventDefault();
        sendMessage();
    }

    function handleAddSubmit(value: string) {
        addConversation(value);
    }

    function handleAddClick() {
        showModal = true;
    }

    function sendMessage()
    {
        if(textareaValue.trim() !== "")
        {
            addEntryToChatDatabase(textareaValue);
            textareaValue = "";
        }
    }

    function onKeyDown(event: KeyboardEvent)
    {
        if (event.key === 'Enter')
        {
            event.preventDefault();
            sendMessage();
        }
    }

    async function addEntryToChatDatabase(prompt: string)
    {
        const convId = $currentConversationId;
        const userMessage: Message = { prompt, response: "" };

        conversations.update((list) => {
            return list.map((conv) => {
                if (conv.conversationId === convId) {
                    const msgs = conv.messages ?? [];
                    return { ...conv, messages: [...msgs, userMessage] };
                }
                return conv;
            });
        });

        try {
            const res = await sendPrompt(convId, prompt);

            conversations.update((list) => {
                return list.map((conv) => {
                    if (conv.conversationId === convId) {
                        const msgs = conv.messages ?? [];
                        msgs[msgs.length - 1] = { prompt: prompt, response: res };
                        return { ...conv, messages: msgs };
                    }
                    return conv;
                });
            });

        } catch (error) {
            if (error instanceof Error) {
                console.error("Fetch Failed: " + error.message);
            } else {
                console.error("Fetch Failed: Unknown error", error);
            }
        }
    }

</script>

<div class="inputZone">
    <AddButton  onClick={handleAddClick} />
    <form on:submit={handleSubmit}>
        <textarea placeholder="Ask the chat" class="user-chat-input" on:keydown={onKeyDown} bind:this={textarea} bind:value={textareaValue} on:input={resizeTextarea}></textarea>
        <button type="submit">
            <SendHorizontal size={30}/>
        </button>
    </form>

    <AddModal
        bind:isOpen={showModal}
        on:submit={(e: CustomEvent<string>) => handleAddSubmit(e.detail)}
        on:close={() => showModal = false}
    />
</div>

<style>

    .inputZone{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        flex: 1;
    }

    form{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        width: 100%;
    }

    textarea{
        resize: none;
        width: 100%;
        height: 2.5rem;
        border-radius: 10px;
        padding: 0.5rem 1.5rem;
        overflow: hidden;
        background-color: #585858;
        font-size: 1.3rem;
    }

    button{
        height: 3rem;
        aspect-ratio: 1;
        background-color: rgba(100, 100, 100, 0);
        border:none;
        color: rgb(58, 105, 190);
    }

    button:hover{
        color: rgb(44, 85, 161);
    }


    @media (min-width: 900px) {
        textarea{
            width: 58%;
        }
    }

</style>