
<script lang="ts">
    import { conversations, currentConversationId } from '../stores/store';
    import { deleteConversation } from "../services/conversation.service";
    import { Trash2 } from "lucide-svelte";
    import { addConversation } from '../utils/addConversation';

    let addConvInputValue : string;

    async function handleConvDeleted(conversationId: number){
        await deleteConversation(conversationId);
        conversations.update(list => list.filter(conv => conv.conversationId !== conversationId));
        currentConversationId.set(1);
    }

    function handleConvSelected(conversationId: number) {
        if ($currentConversationId !== conversationId) {
            currentConversationId.set(conversationId);
        }
    }

    function handleAddConv()
    {
        if(addConvInputValue.trim() !== "")
        {
            addConversation(addConvInputValue);
            addConvInputValue = "";
        }
    }

</script>

<h1>Conversations</h1>


<div class="list-conv">
    <ul>
    {#each $conversations as conv (conv.conversationId)}
        <li class="conv-wrapper">
            <button
                class="conv"
                type="button"
                class:selected={$currentConversationId === conv.conversationId}
                on:click={() => handleConvSelected(conv.conversationId)}
            >
                <span class="conv-text">{conv.conversationName}</span>

                {#if conv.conversationId !== 1}
                <span
                    class="conv-delete"
                    role="button"
                    tabindex="0"
                    on:click={(e) => {
                        e.stopPropagation();
                        handleConvDeleted(conv.conversationId);
                    }}
                    on:keydown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleConvDeleted(conv.conversationId);
                        }
                    }}
                    aria-label="Supprimer la conversation"
                >
                    <Trash2 width="20" height="20" />
                </span>
                {/if}
            </button>
        </li>
    {/each}
    </ul>
</div>
<form on:submit={handleAddConv} class="addNew">
    <input type="text" placeholder="Enter Chat Name" bind:value={addConvInputValue}/>
    <button type="submit" class="add-btn">Add</button>
</form>

<style>

    h1{
        text-align: center;
    }

    .addNew{
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
        gap: 0.8rem;
        flex-direction: column;
    }

    .add-btn{
        border-radius: 10px;;
        height: 2.5rem;
        font-size: 1.3rem;
        background-color: #25852a;
    }

    input, button{
        all: unset;
        box-sizing: border-box;
        width: 100%;
        height: 2rem;
        text-align: center;
        color: white;
    }
    

    input{
        resize: none;
        width: 100%;
        height: 2.5rem;
        border-radius: 10px;
        padding: 0.5rem 1.5rem;
        overflow: hidden;
        background-color: #585858;
        font-size: 1.3rem;
    }

    .conv-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        list-style: none;
        font-weight: bold;
        padding: 0 1rem 0 2rem;
        border-radius: 7px;
    }

    .selected{
        background-color: #272727;
    }

    .conv:hover{
        cursor: pointer;
        background-color: #222222;
    }

    .conv{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem;
        margin: 0.8rem 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 3rem;
        border-radius: 0.75rem;
        color: rgb(204, 204, 204);
        padding: 1rem;
    }


    .conv-delete {
        pointer-events: all;
        cursor: pointer;
    }

    .list-conv ul{
        padding-left: 0;
    }

    h1{
        font-size: 1.4rem;
    }

</style>