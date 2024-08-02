<script>
	import '$lib/scss/index.scss';
	import '../app.css';
	import Header from '$lib/Header.svelte';
</script>

<Header />
<main class="px-4 max-w-5xl mx-auto">
	<slot/>
</main>

<a href="https://gcm.schule/cis/about">
	<img class="absolute top-12 right-0 h-8 m-2"
		 src="https://gcm.schule/logos/cis-wordmark.svg"
		 alt="Campus Information System">
</a>
