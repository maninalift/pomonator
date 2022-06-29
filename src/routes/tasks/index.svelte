<script context="module" lang="ts">
    import { requireUser } from '$lib/restrictions'
    export const load = requireUser
</script>

<script lang="ts">
    import Modal from "$components/Modal.svelte"
    import NewTaskForm from "./_form-new.svelte"

    type Task = {
        status: "done" | "todo"
        title: string
    }

    export let tasks: Task[]
    tasks = [
        {status: "done", title: "Make a House"},
        {status: "done", title: "Walk Nowhere"},
        {status: "done", title: "Milk an Otter"},
        {status: "todo", title: "Reading"},
        {status: "todo", title: "Creative Writing"}
    ]

    /* time fixed  */
    function addTask(){
        tasks.push({status: "todo", title: "EXTRA"})
        //tasks = tasks
    }
    setInterval(addTask, 1000)

    export const status_icon = {
        todo: "⏱",
        done: "✓"
    }
    let showingNewTaskModal: boolean;
</script>

<Modal bind:showing={showingNewTaskModal}>
    <NewTaskForm></NewTaskForm>
</Modal>


<div class="tasks">
    <div class="controls">
        <!-- session status
            either inactive, with a "start session button" or active,
            with a fallow-time timer

         -->
        <div class="session-status active">3:01</div>
        <div class="button new-task" on:click={() => showingNewTaskModal = true}>➕</div>
        <a href="/tasks/hide-done" class="button hide-done">👁️</a>
    </div>
    <div class="tasklist no-border">
        {#each tasks as task}
        <div class="task {task.status}">
            <div class="status-button {task.status}">
                {status_icon[task.status]}
            </div>
            <div class="title">{task.title}</div>
        </div>
        {/each}
    
    </div>
</div>


<style>

.task * {
    display: inline-block;

}
.task .title {
    background-color: rgb(71, 71, 71);
}
.task .status-button.done {
    background-color: green;
}

.task .status-button.todo {
    background-color: mediumslateblue;
}

.controls {
    text-align: right;
}

.controls * {
    display: inline-block;
}

</style>