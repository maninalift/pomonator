<script lang="ts">
    import { session } from '$app/stores'
</script>
  
{#if $session.user?.isCoach}
<slot></slot>
{/if}