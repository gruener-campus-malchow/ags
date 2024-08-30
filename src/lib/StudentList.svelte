<script>
    export let students;

    let search_input = '';

    const page_length = 50;
    let page = 0;
    $: filtered = students.filter(s =>
        `${s.first_name} ${s.last_name}`.toLowerCase().includes(search_input.toLowerCase()) ||
        s.class.includes(search_input.toLowerCase()))
    $: num_pages = Math.ceil(filtered.length / page_length);
    $: student_page = filtered.slice(page * page_length, (page + 1) * page_length);
    $: min_page = Math.max(1, page - 3);
    $: max_page = Math.min(num_pages - 2, page + 3);
</script>

<div class="bg-gray-100 dark:bg-neutral-800 rounded-2xl p-4">
    <label for="student-list-search" class="mr-2">Suche</label>
    <input id="student-list-search" class="input" type="search" bind:value={search_input} on:input={() => page = 0}>

    {#if student_page.length > 0}
        <table class="overflow-auto bg-inherit -mx-4 mt-4">
            <tr class="sticky bg-inherit top-12">
                <th class="px-4">Vorname</th>
                <th class="px-4">Nachname</th>
                <th class="px-4">Klasse</th>
            </tr>
            {#each student_page as student}
                <tr class="border-t border-gray-300">
                    <td class="px-4">{student.first_name}</td>
                    <td class="px-4">{student.last_name}</td>
                    <td class="px-4">{student.class}</td>
                </tr>
            {/each}
        </table>

        <div class="flex justify-center">
            {page * page_length + 1}-{page * page_length + student_page.length} von {filtered.length}
        </div>
    {:else}
        <div class="mt-4">
            Keine Ergebnisse
        </div>
    {/if}
    {#if filtered.length > page_length}
        <div class="flex justify-between">
            <button class:link={page > 0} on:click={() => page --}>←</button>
            <div class="flex gap-2">
                <button class:link={page !== 0} on:click={() => page = 0}>1</button>
                {#if min_page > 1}…{/if}
                {#each Array(max_page - min_page + 1) as _, i}
                    <button class:link={page !== i + min_page} on:click={() => page = i + min_page}>{i + min_page + 1}</button>
                {/each}
                {#if max_page < num_pages - 2}…{/if}
                <button class:link={page !== num_pages - 1} on:click={() => page = num_pages - 1}>{num_pages}</button>
            </div>
            <button class:link={page < num_pages - 1} on:click={() => page ++}>→</button>
        </div>
    {/if}
</div>

