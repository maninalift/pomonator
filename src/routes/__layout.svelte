<script lang="ts">
  import WithUser from "$components/auth/WithUser.svelte"
  import WithCoach from "$components/auth/WithCoach.svelte"
  import WithStudent from "$components/auth/WithStudent.svelte"
  import WithAdmin from "$components/auth/WithAdmin.svelte"
  import WithoutUser from "$components/auth/WithoutUser.svelte"
</script>

<svelte:head>
  <title>Pomonator</title>
</svelte:head>

<nav>
  <a href="/">Home</a>

  <WithoutUser>
    <a href="/auth/login">Login</a>
    <a href="/auth/register">Register</a>
  </WithoutUser>
 
  <WithStudent><a href="/tasks">Tasks</a></WithStudent>
  <WithCoach><a href="/students">Students</a></WithCoach>
  <WithAdmin><a href="/admin">Admin</a></WithAdmin> 
  <WithUser><a href="/auth/logout">Log out</a></WithUser>

</nav>

<slot />