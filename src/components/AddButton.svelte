<script>
import { Plus } from "lucide-svelte";
</script>

<button aria-label="Menu">
    <Plus />
</button>

<style>

button{
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1;
    background-color: #25852a;
    border-radius: 10px;
    border: none;
    color: white;
}


@media (min-width: 900px) {
    button{
        display: none;
    }
}

</style>