<script lang="ts">
	import { onMount } from 'svelte';
	import { firebaseApp } from '$lib/firebase';
	import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
	import { getFirestore, collection, getDocs } from 'firebase/firestore';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Card, { Content, Media } from '@smui/card';

	let vendors: Map<string, { [key: string]: string }> = new Map();
	let partners: Map<string, { [key: string]: string }> = new Map();
	let logoUrls: Map<string, string> = new Map();
	onMount(async () => {
		const storage = getStorage(firebaseApp);
		const logoList = await listAll(ref(storage, 'public/logos'));
		logoList.items.forEach(async (logo) => {
			const logoUrl = await getDownloadURL(ref(storage, logo.fullPath));
			logoUrls.set(logo.name.split('.')[0], logoUrl);
			logoUrls = logoUrls;
		});

		const firestore = getFirestore(firebaseApp);
		const querySnapshot = await getDocs(collection(firestore, 'businesses'));
		querySnapshot.forEach((business) => {
			const details = business.data();
			if (details.type === 'vendor') {
				vendors.set(business.id, details);
				vendors = vendors;
			} else if (details.type === 'partner') {
				partners.set(business.id, details);
				partners = partners;
			}
		});
	});
</script>

{#if vendors.size}
	<h2>Vendors</h2>
	<LayoutGrid>
		{#each [...vendors] as [id, business]}
			<Cell>
				<Card style="text-align: center;">
					<Content>
						<h3 style="margin: 0;">{business.name}</h3>
					</Content>
					<Media
						aspectRatio="square"
						style="background-size:initial; background-image: url({logoUrls.get(id)});"
					/>
					<Content>
						<h4 style="margin: 0;">{business.promotion || ''}</h4>
						<h5 style="margin: 0 0 10px; color: gray;">{business.note || ''}</h5>
						{business.description || ''}
					</Content>
				</Card>
			</Cell>
		{/each}
	</LayoutGrid>
{/if}

{#if partners.size}
	<h2>Partners</h2>
	<LayoutGrid>
		{#each [...partners] as [id, business]}
			<Cell>
				<Card style="text-align: center;">
					<Content>
						<h3 style="margin: 0;">{business.name}</h3>
					</Content>
					<Media
						aspectRatio="square"
						style="background-size:initial; background-image: url({logoUrls.get(id)});"
					/>
					<Content>
						<h4 style="margin: 0;">{business.promotion || ''}</h4>
						<h5 style="margin: 0 0 10px; color: gray;">{business.note || ''}</h5>
						{business.description || ''}
					</Content>
				</Card>
			</Cell>
		{/each}
	</LayoutGrid>
{/if}

<style>
	h2 {
		text-align: center;
		text-decoration: underline;
	}
</style>
