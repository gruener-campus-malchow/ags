<script>
    import { enhance } from '$app/forms';
</script>

<h1 class="h1">AG-Verwaltung</h1>
<div class="flex">
    <form action="?/login" method="post" use:enhance>
        <div class="list form-list gap-y-2">
            <label for="username">Benutzername</label>
            <input id="username" type="text" class="input" name="username" required>
            <label for="password">Passwort</label>
            <input id="password" type="password" class="input" name="password" required>
        </div>
        <div class="mt-4 flex justify-end">
            <button class="btn btn-primary">anmelden</button>
        </div>
    </form>
</div>
