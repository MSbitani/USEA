<script lang="ts">
	import TopAppBar, {
		Row,
		Section,
		Title,
		AutoAdjust,
		TopAppBarComponentDev
	} from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import LoginButton from '$lib/auth/LoginButton.svelte';

	let topAppBar: TopAppBarComponentDev;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link rel="stylesheet" href="node_modules/svelte-material-ui/bare.css" />
</svelte:head>

<TopAppBar bind:this={topAppBar} fixed>
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title>USEA Seoul</Title>
		</Section>
		<Section align="end">
			<LoginButton />
		</Section>
	</Row>
</TopAppBar>

<AutoAdjust {topAppBar}>
	<slot />
</AutoAdjust>

<style>
	:global(body),
	:global(html) {
		margin: 0px;
		padding: 0px;
	}
	:root {
		--mdc-theme-primary: #06b;
		--mdc-theme-secondary: #fd0;
		--mdc-theme-background: #fff;
		--mdc-theme-surface: #fff;
		--mdc-theme-error: #c00;
		--mdc-theme-on-primary: #fff;
		--mdc-theme-on-secondary: #000;
		--mdc-theme-on-surface: #000;
		--mdc-theme-on-error: #fff;
		--mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);
		--mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);
		--mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
		--mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
		--mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
		--mdc-theme-text-primary-on-dark: #fff;
		--mdc-theme-text-secondary-on-dark: hsla(0, 0%, 100%, 0.7);
		--mdc-theme-text-hint-on-dark: hsla(0, 0%, 100%, 0.5);
		--mdc-theme-text-disabled-on-dark: hsla(0, 0%, 100%, 0.5);
		--mdc-theme-text-icon-on-dark: hsla(0, 0%, 100%, 0.5);
	}
</style>
