<script>
    import { enhance } from '$app/forms';

    export let data;

    function handle_subscribe({ formData }) {
        data.ags.find(a => a.id === formData.get('id'))
            .loading = true;
        data.ags = data.ags;

        return async ({ result }) => {
            const result_data = result.data.ag;
            const ag = data.ags.find(a => a.id === result_data.id);
            ag.subscribed = result_data.subscribed;
            ag.loading = false;
            data.ags = data.ags;
        };
    }
</script>

<h1 class="h1">AG-Übersicht</h1>
<!--p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p-->

<ul class="flex flex-wrap gap-4">
    {#each data.ags as ag}
        <li class="w-80 max-sm:w-auto bg-gray-100 rounded-2xl overflow-hidden">
            {#if ag.image_url}
                <img class="w-full aspect-2 bg-gray-200 object-cover" src={ag.image_url} alt={ag.name}>
            {:else}
                <div class="w-full aspect-2 bg-gray-200"></div>
            {/if}

            <form action={ ag.subscribed ? '?/unsubscribe' : '?/subscribe' } method="post"
                  use:enhance={handle_subscribe}
                  class="p-4 h-64 box-content flex flex-col">
                <input type="hidden" name="id" value={ag.id}>
                <h2 class="text-2xl font-bold">{ag.name}</h2>
                <p class="flex-grow mt-2 mb-4 leading-tight overflow-auto whitespace-pre-line">{ag.description || ''}</p>
                <div class="flex items-end justify-between gap-4">
                    <div class="list">
                        {#if ag.slots}<span>Plätze:</span><strong>{ag.slots}</strong>{/if}
                        <span>Anmeldungen:</span><strong>{ag.waiting_list}</strong>
                    </div>
                    <button class="btn" class:btn-primary={!ag.subscribed} class:loading={ag.loading} type="submit">
                        {ag.subscribed ? 'angemeldet' : 'anmelden'}
                    </button>
                </div>
            </form>
        </li>
    {/each}
</ul>
