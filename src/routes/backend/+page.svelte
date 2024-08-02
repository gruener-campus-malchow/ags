<script>
    export let data;
</script>

<h1 class="h1">AG-Verwaltung</h1>
<!--p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p-->

<form method="post">
    <input class="border-2 rounded" name="name" placeholder="name" required>
    <input class="border-2 rounded" type="email" placeholder="organizer email" name="organizer_email" required>
    <button class="btn">→</button>
</form>
