<script>
    import { enhance } from '$app/forms';

    export let data;
</script>

<h1 class="h1">AG-Verwaltung</h1>

<div class="flex flex-wrap gap-4">
    <form class="bg-gray-100 dark:bg-neutral-800 rounded-2xl p-4"
          action="?/upload_students" method="post" enctype="multipart/form-data" use:enhance>
        <h2 class="h2 mt-0">CSV-Upload</h2>
        <input type="file" name="csv" accept="text/csv" required>
        <div class="mt-4 flex justify-end">
            <button class="btn btn-primary">speichern</button>
        </div>
    </form>

    <div class="bg-gray-100 dark:bg-neutral-800 rounded-2xl py-4 max-h-40 overflow-auto">
        <table class="overflow-auto bg-inherit">
            <tr class="sticky bg-inherit -top-4">
                <th>Vorname</th>
                <th>Nachname</th>
            </tr>
            {#each data.students as student}
                <tr class="border-t border-gray-300">
                    <td class="px-4">{student.first_name}</td>
                    <td class="px-4">{student.last_name}</td>
                </tr>
            {/each}
        </table>
    </div>

    <ul class="bg-gray-100 dark:bg-neutral-800 rounded-2xl p-4 grid gap-x-4 grid-cols-[auto_auto]">
        {#each data.students as student}
            <li class="contents">
                <span>{student.first_name}</span>
                <span>{student.last_name}</span>
            </li>
        {/each}
    </ul>
</div>
