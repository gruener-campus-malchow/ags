<script>
    import { enhance } from '$app/forms';

    export let data;

    let student_grade = parseInt(data.student.class)
    $: filtered_ags = data.ags.filter(ag =>
        student_grade >= (ag.min_grade || 0) && student_grade <=(ag.max_grade || 13))

    function handle_apply({ formData }) {
        data.ags.find(a => a.id === formData.get('id'))
            .loading = true;
        data.ags = data.ags;

        return async ({ result }) => {
            const result_data = result.data.ag;
            const ag = data.ags.find(a => a.id === result_data.id);
            ag.applications = result_data.applications;
            ag.applied = result_data.applied;
            ag.loading = false;
            data.ags = data.ags;
        };
    }
</script>

<h1 class="h1">AG-Übersicht</h1>
<!--p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p-->

<ul class="flex flex-wrap gap-4">
    {#each filtered_ags as ag}
        <li class="w-80 max-sm:w-auto max-sm:flex-grow bg-gray-100 dark:bg-neutral-800 rounded-2xl overflow-hidden">
            {#if ag.image_url}
                <img class="w-full aspect-2 bg-gray-200 dark:bg-neutral-700 object-cover" src={ag.image_url} alt={ag.name}>
            {:else}
                <div class="w-full aspect-2 bg-gray-200 dark:bg-neutral-700"></div>
            {/if}

            <form action={ ag.applied ? '?/revoke' : '?/apply' } method="post"
                  use:enhance={handle_apply}
                  class="p-4 h-64 box-content flex flex-col">
                <input type="hidden" name="id" value={ag.id}>
                <h2 class="text-2xl font-bold line-clamp-3 shrink-0" title={ag.name}>{ag.name}</h2>
                <p class="flex-grow mt-2 mb-4 leading-tight overflow-auto whitespace-pre-line">{ag.description || ''}</p>
                <div class="flex items-end justify-between gap-4">
                    <div class="list gap-x-2">
                        {#if ag.slots}<span>Plätze:</span><strong>{ag.slots}</strong>{/if}
                        <span>Bewerbungen:</span><strong>{ag.applications}</strong>
                    </div>

                    <div class="flex items-center">
                        <!--{#if ag.loading}
                            <span class="loading text-gray-600"></span>
                        {:else if ag.applied}
                            <span class="text-gray-600"><Tick /></span>
                        {/if}-->

                        <button class="btn" class:btn-primary={!ag.applied} class:loading={ag.loading} type="submit">
                            {ag.applied ? 'abmelden' : 'bewerben'}
                        </button>
                    </div>
                </div>
            </form>
        </li>
    {/each}
</ul>
