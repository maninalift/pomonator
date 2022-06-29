<script lang="ts">
    import { session } from '$app/stores'
</script>
  
{#if $session.user?.isAdmin}
<slot></slot>
{/if}