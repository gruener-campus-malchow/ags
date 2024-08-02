<script>
	import Card from '$lib/Card.svelte';
	export let data;

    function create() {
        fetch('', {
            method: 'POST',
            body: new URLSearchParams({
                name: 'test',
            }),
        })
    }
</script>
<h1 class="h1">AG-Wahl: {data.name}</h1>

<form method="post">
    <input class="border-2 rounded" name="name" required>
    <textarea class="border-2 rounded" name="description" required></textarea>
    <input class="border-2 rounded" name="slots" type="number">
    <input class="border-2 rounded" name="image" type="url">
    <button class="btn">→</button>
</form>

<Card {...data} />

<button class="btn" on:click={create}>add</button>
