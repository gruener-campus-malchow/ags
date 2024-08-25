<script>
    import { enhance } from '$app/forms';

    let pin = '', form;
    $: if (pin.length >= 5) form.requestSubmit();
</script>

<h1 class="h1">AG-Verwaltung</h1>
<div class="flex">
    <form action="?/login" method="post" bind:this={form} use:enhance>
        <div class="list form-list gap-y-2">
            <label for="pin">Pin</label>
            <input id="pin" type="text" class="input" name="pin" bind:value={pin} required>
        </div>
        <div class="mt-4 flex justify-end">
            <button class="btn btn-primary">anmelden</button>
        </div>
    </form>
</div>
