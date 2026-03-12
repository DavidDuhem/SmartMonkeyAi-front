<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let isOpen = false;
  let inputValue = "";

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    dispatch("submit", inputValue);
    inputValue = "";
    dispatch("close");
  }

  function closeModal() {
    dispatch("close");
  }
</script>

{#if isOpen}
    <div 
        class="overlay"
        role="button"
        tabindex="0"
        on:click={closeModal}
        on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeModal(); }}
    >
        <div
        class="modal"
        role="dialog"
        tabindex="0"
        aria-modal="true"
        on:click|stopPropagation
        on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); }}
        >
            <form on:submit={handleSubmit}>
                <input type="text" placeholder="Enter Chat Name" bind:value={inputValue}/>
                <button type="submit">Add</button>
            </form>
        </div>
    </div>
{/if}

<style>
.overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background-color: #424242;
    padding: 1rem 2rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.modal input {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    color: black;
}

.modal input::placeholder {
    color: rgb(151, 151, 151);
    opacity: 1;
}

.modal button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #25852A;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.modal button:hover {
    background-color: #207725;
}
</style>