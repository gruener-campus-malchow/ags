<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
</script>

<Header />
<main class="px-4 pb-4 max-w-5xl mx-auto">
	<slot/>
</main>

<a href="https://gcm.schule/cis/about" class="absolute top-12 right-0 m-2">
	<img class="h-8"
		 src="https://gcm.schule/logos/cis-wordmark.svg"
		 alt="Campus Information System">
</a>
