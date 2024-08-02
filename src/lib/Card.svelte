<script>
	export let image, name, description;
	export let slots, waiting_list;
</script>

<li class="w-80 max-sm:w-auto bg-gray-100 rounded-2xl overflow-hidden">
	{#if image}
		<img class="w-full aspect-2 bg-gray-200 object-cover" src={image}>
	{:else}
		<div class="w-full aspect-2 bg-gray-200"></div>
	{/if}
	<div class="p-4">
		<h2 class="text-2xl font-bold">{name}</h2>
		<p class="h-48 mt-2 mb-4 leading-tight overflow-auto whitespace-pre-line">{description || ''}</p>
		<div class="flex items-end justify-between gap-4">
			<div class="list">
				{#if slots}<span>Plätze:</span><strong>{slots}</strong>{/if}
				<span>Anmeldungen:</span><strong>{waiting_list}</strong>
			</div>
			<button class="btn btn-primary">anmelden</button>
		</div>
	</div>
</li>
