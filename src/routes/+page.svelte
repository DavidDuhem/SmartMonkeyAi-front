<script lang="ts">
    import { onMount, tick } from "svelte";
    import HeaderZone from "../components/HeaderZone.svelte";
    import UserInputZone from "../components/UserInputZone.svelte";
    import '../app.css';
    import ChatZone from "../components/ChatZone.svelte";
    import LeftPanel from "../components/LeftPanel.svelte";
    import { createSessionId } from "../services/session.service";
    import { getAllConversations } from "../services/conversation.service";
    import { conversations, currentConversationId } from "../stores/store";
    
    let container: HTMLDivElement | null = null;

    export async function scrollToBottom(){
        await tick();

        if(container){
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    onMount(async () => {
        await createSessionId();
        const data = await getAllConversations();
        const list = Object.values(data);
        conversations.set(list);

        if (list.length) {
            currentConversationId.set(list[0].conversationId);
        }
    });

</script>
    <section id="container">
        <section id="left-panel">
            <LeftPanel />
        </section>
        <header>
            <HeaderZone />
        </header>
        <div id="right-panel" bind:this={container}>
            <main>
                <ChatZone onNewMessage={scrollToBottom}/>
            </main>
            <footer>
                <UserInputZone />
            </footer>
        </div>
    </section>
<style>
    
    :root {
        --footer-padding: 1rem;
        --footer-height: 3rem;
        --header-height: 7rem;

        --menu-background-color: #171717;
    }

    #container{
        position: relative;
        height: 100%;
        display: flex;
    }

    #left-panel{
        display: none;
        position: fixed;
        flex-direction: column;
        justify-content: left;
        background-color: var(--menu-background-color);
        top: 0;
        left: 0;
        width: 300px;
        height: calc(100vh - var(--header-height));
        margin-top: calc(var(--header-height));
        padding: 1rem;
    }

    #right-panel{
        margin-top: calc(var(--header-height) + 1rem);
        height: calc(100% - var(--header-height));
        width: 100%;
        overflow-y: auto;
    }
    
    #right-panel::-webkit-scrollbar {
        width: 0.8rem;
    }

    #right-panel::-webkit-scrollbar-track {
        background: #171717;
    }

    #right-panel::-webkit-scrollbar-thumb {
        background-color: #494949;
        border-radius: 4px;
        border: 2px solid transparent;
        background-clip: content-box;
    }

    #right-panel::-webkit-scrollbar-thumb:hover {
        background-color: #585858; 
    }

    header{
        display:flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        position: fixed;
        top: 0;
        left: 0;
        height: var(--header-height);
        width: 100vw;
        background-color: var(--menu-background-color);
    }

    main{
        display: flex;
        flex-direction: column;
        margin-bottom: 4rem;
    }

    footer{
        position: fixed;
        top: calc(100vh - var(--footer-height) - var(--footer-padding));
        display:flex;
        align-items: center;
        justify-content: left;
        gap: 1rem;
        height: var(--footer-height);
        padding: var(--footer-padding) 1.2rem;
        width: 100%;
    }


    @media (min-width: 900px) {
        #left-panel{
            display: flex;
        }

        #right-panel{
            margin-left: 300px;
        }
        
        footer{
            top: calc(100vh - var(--footer-height) - var(--footer-padding));
            height: var(--footer-height);
            padding-right: var(--footer-padding);
            width: calc(100vw - 300px);
        }

        main{
            width: 60%;
            margin: auto;
            margin-bottom: 4rem;
        }
    }
    
</style>