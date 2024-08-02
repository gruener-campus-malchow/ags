<script>
    import Card from '$lib/Card.svelte';
    export let data;
</script>

<h1 class="h1">AG-Übersicht</h1>
<!--p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p-->
<ul class="flex flex-wrap gap-4">
    {#each data.ags as ag}
        <Card {...ag} />
    {/each}
</ul>

<style>
    ul {
        list-style: none;
    }
</style>
