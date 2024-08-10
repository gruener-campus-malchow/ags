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
        <div class="bg-gray-100 dark:bg-neutral-800 rounded-2xl p-4">
            <h2 class="h2 mt-0">Allgemeine Informationen</h2>
            <div class="list form-list gap-y-2">
                <label for="ag_name">Name</label>
                <input id="ag_name" type="text" maxlength="64" class="input invalid:border-red-600"
                       name="name" value={data.name} required>
                <label for="ag_description">Beschreibung</label>
                <textarea id="ag_description" class="input" name="description">{data.description}</textarea>
                <label for="ag_image">Bild</label>
                <input id="ag_image" class="w-80" type="file" name="image" bind:files={selected_image}
                       accept="image/png, image/jpeg, image/svg+xml">
                {#if image_url}
                    <div></div>
                    <img class="w-80 h-40 bg-gray-200 dark:bg-neutral-700 rounded-lg object-cover text-gray-600"
                         src={image_url}
                         alt="Vorschau">
                {/if}
            </div>
        </div>

        <div class="bg-gray-100 dark:bg-neutral-800 rounded-2xl p-4">
            <h2 class="h2 mt-0">Verteilung</h2>
            <div class="list form-list gap-y-2">
                <label for="ag_slots">Anzahl Teilnehmer:innen</label>
                <input id="ag_slots" type="number" class="input w-32 invalid:border-red-600"
                       min="1" max="99" name="slots" value={data.slots} required>
                <label for="ag_min_grade">Klassenstufe <span class="float-end">von</span></label>
                <input id="ag_min_grade" type="number" class="input w-32 invalid:border-red-600"
                       min="1" max={data.max_grade || 13} name="min_grade" bind:value={data.min_grade}>
                <label for="ag_max_grade"><span class="float-end">bis</span></label>
                <input id="ag_max_grade" type="number" class="input w-32 invalid:border-red-600"
                       min={data.min_grade || 1} max="13" name="max_grade" bind:value={data.max_grade}>
            </div>
        </div>
    </div>

    <div class="my-4 flex gap-2 items-center">
        <button class="btn btn-primary" type="submit">speichern</button>
        {#if state === 'submitting'}
            <span class="loading text-gray-600 dark:text-neutral-300"></span>
        {:else if state === 'submitted'}
            <span class="text-gray-600 dark:text-neutral-300"><Tick /></span>
        {/if}
    </div>
</form>
