<script context="module" lang="ts">
    import { requireCoach } from '$lib/restrictions'
    export const load = requireCoach
</script>

<script lang="ts">
    type Student = {
        name: string;
        username: string;
    }

    export let students: Student[] = []
</script>


{#each students as student}
    <div class="student">{student.name}</div>
{/each}
