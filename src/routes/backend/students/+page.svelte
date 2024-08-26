<script>
    import { enhance } from '$app/forms';

    export let data;
</script>

<h1 class="h1">AG-Verwaltung</h1>

<div class="flex flex-wrap gap-4">
    <form class="max-w-96 bg-gray-100 dark:bg-neutral-800 rounded-2xl p-4"
          action="?/upload_students" method="post" enctype="multipart/form-data" use:enhance>
        <h2 class="h2 mt-0">CSV-Import</h2>
        <p class="my-4">Hier kann eine komplette SuS-Liste im CSV-Format (<a class="text-green-600 underline" href="/example-students.csv">Beispiel-Datei</a>) hochgeladen werden.</p>
        <input type="file" name="csv" accept="text/csv" required>
        <div class="mt-4 flex justify-end">
            <button class="btn btn-primary">speichern</button>
        </div>
    </form>

    <div class="bg-gray-100 dark:bg-neutral-800 rounded-2xl py-4 max-h-40 overflow-auto">
        <table class="overflow-auto bg-inherit">
            <tr class="sticky bg-inherit -top-4">
                <th class="px-4">Vorname</th>
                <th class="px-4">Nachname</th>
            </tr>
            {#each data.students as student}
                <tr class="border-t border-gray-300">
                    <td class="px-4">{student.first_name}</td>
                    <td class="px-4">{student.last_name}</td>
                </tr>
            {/each}
        </table>
    </div>
</div>
