<script lang="ts">
    import { Menu } from "lucide-svelte";
    import { slide } from "svelte/transition";
    import { currentConversationId, conversations } from '../stores/store';

    let showDrawer = false;

    function toggleDrawer() {
        showDrawer = !showDrawer;
    }

    function selectConversation(id: number) {
        currentConversationId.set(id);
        showDrawer = false;
    }
</script>

{#if !showDrawer}
<button aria-label="Menu" on:click={toggleDrawer} class="menu-button">
    <Menu />
</button>
{/if}

{#if showDrawer}
  <div 
    class="overlay" 
    role="button" 
    tabindex="0"
    on:click={() => (showDrawer = false)}
    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') showDrawer = false; }}
  >
    <aside class="drawer" transition:slide={{ duration: 250 }}>
        <h3>Conversations</h3>
        {#each $conversations as conv}
            <button 
            type="button"
            class="drawer-item {conv.conversationId === $currentConversationId ? 'active' : ''}" 
            on:click={() => selectConversation(conv.conversationId)}
            >
            {conv.conversationName}
            </button>
        {/each}
    </aside>
  </div>
{/if}

<style>
    .menu-button {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        width: 3rem;
        height: 3rem;
        background-color: rgba(0, 0, 0, 0);
        color: white;
        border: none;
        z-index: 1001;
        cursor: pointer;
    }

    @media (min-width: 900px) {
        .menu-button {
            display: none;
        }
    }

    .overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        z-index: 1000;
        outline: none;
    }

    .drawer {
        background-color: #424242;
        width: 250px;
        max-width: 80%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 90%;
        overflow-y: auto;
    }

    .drawer h3 {
        margin: 0 0 0.5rem 0;
        color: white;
    }

    .drawer-item {
        padding: 0.5rem 0.75rem;
        border-radius: 5px;
        cursor: pointer;
        color: white;
        background: none;
        border: none;
        text-align: left;
        font-size: 1rem;
        transition: background-color 0.2s;
    }

    .drawer-item.active {
        background-color: #272727;
    }

    .drawer-item:hover {
        background-color: #1d1d1d;
    }
</style>