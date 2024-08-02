<script>
    export let data;

    function update(e) {
        // ...
    }
</script>

<h1 class="h1">AG-Registrierung</h1>
<p class="my-4">Hier können Sie zusätzliche Informationen zu Ihrer AG ergänzen.</p>

<form on:submit={update} method="post">
    <input type="hidden" name="key" value={data.key}>

    <div class="flex flex-wrap gap-4">
        <div class="bg-gray-100 rounded-2xl p-4">
            <h2 class="h2 mt-0">Allgemeine Informationen</h2>
            <div class="list form-list gap-y-2">
                <span>Name</span>
                <input type="text" class="border-2 rounded px-2 py-1 text-gray-600" name="name" value={data.name} disabled>
                <span>Beschreibung</span>
                <textarea class="border-2 rounded px-2 py-1" name="description">{data.description}</textarea>
                <span>Bild</span>
                <input type="file" name="image">
            </div>
        </div>

        <div class="bg-gray-100 rounded-2xl p-4">
            <h2 class="h2 mt-0">Verteilung</h2>
            <div class="list form-list gap-y-2">
                <span>Anzahl Teilnehmer:innen</span>
                <input type="number" class="border-2 rounded px-2 py-1 text-gray-600" name="slots" value={data.slots} required>
            </div>
            <mark>Hier könnten noch zusätzliche Optionen rein (z.B. Geschlecht)</mark>
        </div>
    </div>

    <div class="my-4">
        <button class="btn btn-primary" type="submit">speichern</button>
    </div>
</form>
