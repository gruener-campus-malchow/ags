<script>
    import { page } from '$app/stores';
</script>

<!-- pre>
/!\
{#if $page.status === 404}
Seite nicht gefunden
{:else}
HTTP {$page.status}
{$page.error.message}
{/if}
</pre -->

<div class="flex">
    <div class="mx-auto mt-48 grow max-w-128 p-4 bg-gray-100 dark:bg-neutral-700 rounded-2xl -z-10 relative">
        <div class="absolute inset-0 m-4 -z-10 text-9xl text-gray-300 dark:text-neutral-500 text-right">{$page.status}</div>
        <img src="/favicon.svg" alt="GCM" class="h-12">
        <h1 class="h1">{$page.error.message}</h1>
        {#if $page.status === 404}
            <p>Die Seite konnte nicht gefunden werden.</p>
        {/if}
    </div>
</div>
