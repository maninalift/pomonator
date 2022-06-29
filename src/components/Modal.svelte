<script lang="ts">
    export let showing = false
</script>

{#if showing}
<div class="modal-wrapper">
    <div class="modal">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</div>
{/if}

<style>
    .modal-wrapper {
        border-radius: 0px;
        border-style: none;
        border-width: 0px;
        top: 0;
        left: 0;
        position: fixed; 
        height: 100vh;
        width: 100vw;
        margin: 0px;
        background-color: rgb(50, 50, 50);
        background-color: rgba(0, 0, 0, 0.6);
    }
    .modal {
        border-radius: 10px;
        border-style: none;
        border-width: 0px;

        background-color: white;
        max-width: 80vw;
        padding: 1rem;
        margin: 15% auto;
        color: black;

        box-shadow: 0px 0px 15px rgba(255, 255, 255, 1);
    }

    .modal-content {
        border-radius: 0px;
        border-style: none;
        border-width: 0px;

        max-height: 100%;
    }
</style>