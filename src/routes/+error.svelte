<script>
    import { page } from '$app/stores';
</script>

<pre>
 /!\
{#if $page.status === 404}
Seite nicht gefunden
{:else}
{$page.status}
{$page.error.message}
{/if}
</pre>
