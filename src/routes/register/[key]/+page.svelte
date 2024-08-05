<script>
    import { enhance } from '$app/forms';
    import Tick from '$lib/icons/Tick.svelte';

    export let data;

    let selected_image;
    $: image_url = selected_image ? URL.createObjectURL(selected_image[0]) : data.image_url;
    let state = 'none';

    function handle_submit() {
        state = 'submitting';
        return async ({ update }) => {
            await update({ reset: false });
            state = 'submitted';
            setTimeout(() => state = 'none', 5000);
        };
    }
</script>

<h1 class="h1">AG-Registrierung</h1>
<p class="my-4">Hier können Sie zusätzliche Informationen zu Ihrer AG ergänzen.</p>

<form method="post" enctype="multipart/form-data" use:enhance={handle_submit}>
    <input type="hidden" name="key" value={data.key}>

    <div class="flex flex-wrap gap-4">
        <div class="bg-gray-100 rounded-2xl p-4">
            <h2 class="h2 mt-0">Allgemeine Informationen</h2>
            <div class="list form-list gap-y-2">
                <span>Name</span>
                <input type="text"
                       class="border-2 rounded px-2 py-1 text-gray-600"
                       name="name"
                       value={data.name} disabled>
                <span>Beschreibung</span>
                <textarea class="border-2 rounded px-2 py-1" name="description">{data.description}</textarea>
                <span>Bild</span>
                <input class="w-80" type="file" accept="image/png, image/jpeg, image/svg+xml" name="image" bind:files={selected_image}>
                {#if image_url}
                    <span></span>
                    <img class="w-80 h-40 bg-gray-200 rounded-lg object-cover text-gray-600"
                         src={image_url}
                         alt="Vorschau">
                {/if}
            </div>
        </div>

        <div class="bg-gray-100 rounded-2xl p-4">
            <h2 class="h2 mt-0">Verteilung</h2>
            <div class="list form-list gap-y-2">
                <span>Anzahl Teilnehmer:innen</span>
                <input type="number" class="border-2 rounded px-2 py-1 text-gray-600" name="slots" value={data.slots}
                       required>
            </div>
            <mark>Hier könnten noch zusätzliche Optionen rein (z.B. Geschlecht)</mark>
        </div>
    </div>

    <div class="my-4 flex gap-2 items-center">
        <button class="btn btn-primary" type="submit">speichern</button>
        {#if state === 'submitting'}
            <span class="loading text-gray-600"></span>
        {:else if state === 'submitted'}
            <span class="text-gray-600"><Tick /></span>
        {/if}
    </div>
</form>
