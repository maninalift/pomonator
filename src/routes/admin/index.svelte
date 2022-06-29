<script context="module" lang="ts">
    import {requireAdmin} from "$lib/restrictions"
    export const load = requireAdmin
</script> 
  
  <script lang="ts">
    export let user: string
  </script>
  
  <h1>Protected</h1>
  
  <p>Welcome {user}!</p>