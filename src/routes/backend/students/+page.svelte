<script>
    import { enhance } from '$app/forms';
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
</div>
