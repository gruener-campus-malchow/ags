<script>
    import { enhance } from '$app/forms';
</script>

<h1 class="h1">AG-Verwaltung</h1>

<div class="flex flex-wrap gap-4">
    <form class="bg-gray-100 rounded-2xl p-4" action="?/create_ag" method="post" use:enhance>
        <h2 class="h2 mt-0">Neue AG anlegen</h2>
        <div class="list form-list gap-y-2">
            <label for="ag_name">AG-Name</label>
            <input id="ag_name" type="text" maxlength="64" class="input" name="name" required>
            <label for="ag_min_grade">E-Mail AG-Leitung</label>
            <input id="ag_organizer_email" type="email" class="input" name="organizer_email" required>
        </div>
        <div class="mt-4 flex justify-end">
            <button class="btn btn-primary">speichern</button>
        </div>
    </form>
</div>
