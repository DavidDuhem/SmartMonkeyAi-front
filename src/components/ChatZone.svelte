<script>
    import { currentConversation } from "../stores/store";
    import Markdown from 'svelte-exmarkdown';

    export let onNewMessage;

    $: if ($currentConversation?.messages?.length) {
        onNewMessage?.();
    }
</script>

{#if $currentConversation}
    {#each $currentConversation.messages as message}
        <div class="user">
            <p>{message.prompt}</p>
            <div class="avatar">
                <img class="avatar" src="/user-avatar.jpg" alt="user avatar"/>
            </div>
        </div>

        <div class="ai">
            <p><Markdown md={message.response} /></p>
            <div class="avatar">
                <img class="avatar" src="/ai-avatar.png" alt="ai avatar"/>
            </div>
        </div>
    {/each}
{/if}

<style>

.user{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
    margin: 1rem;
}

.ai{
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 1rem;
    margin: 1rem;
}

.avatar{
    width: 3rem;
    height: 3rem;
    border-radius: 25px;
    aspect-ratio: 1;
    background-color: rgb(233, 233, 233);
}

.user > p{
    border-radius:  10px 0 10px 10px;
    background-color: #424242;
}

.ai > p{
    border-radius:  0 10px 10px 10px;
    background-color: #303030;
}

p{
    padding: 1rem 2rem;
    font-size: 1.3rem;
}

@media (max-width: 600px) {
    .avatar {
        width: 2rem;
        height: 2rem;
    }

    p {
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }

    .user > p, .ai > p {
        max-width: 70%;
        word-wrap: break-word;
    }

    .user, .ai {
        gap: 0.5rem;
        margin: 0.5rem;
    }
}
</style>