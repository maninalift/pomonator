<script lang="ts">
    import { session } from '$app/stores'
</script>
  
{#if $session.user?.isStudent}
<slot></slot>
{/if}