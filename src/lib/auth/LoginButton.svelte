<script lang="ts">
	import { onMount } from 'svelte';
	import { isValidLinkLogin, emailLogin, googleLogin, logout, user } from './index';
	import Button, { Label, Icon } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import CircularProgress from '@smui/circular-progress';
	import MenuSurface, { MenuSurfaceComponentDev } from '@smui/menu-surface';
	import { Separator } from '@smui/list';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	let loginOptions: MenuSurfaceComponentDev;
	let showEmailLogin = false;
	let loginEmail = null;
	let invalidEmail = false;
	let sendingEmail = false;
	let sentEmail = false;
	let loginFailed = false;

	onMount(async () => {
		if ((await isValidLinkLogin()) === false) {
			loginFailed = true;
			showEmailLogin = true;
			loginOptions.setOpen(true);
		}
	});
</script>

{#if $user === undefined}
	<CircularProgress id="loadingUser" style="height: 2em; width: 2em;" indeterminate />
{:else if $user}
	<Button on:click={logout}>
		<Label>Logout</Label>
		<Icon class="material-icons">logout</Icon>
	</Button>
{:else}
	<div>
		<Button on:click={() => loginOptions.setOpen(true)}>
			<Icon class="material-icons">login</Icon>
			<Label>Login</Label>
		</Button>
		<MenuSurface id="loginOptions" style="width: 300px;" bind:this={loginOptions}>
			{#if showEmailLogin}
				<div>
					<IconButton class="material-icons" on:click={() => (showEmailLogin = false)}
						>arrow_back</IconButton
					>
				</div>
				{#if sentEmail}
					<p style="margin: 1em;">
						Please click the link in the email you were just sent to log in.
					</p>
				{:else}
					{#if loginFailed}
						<p style="margin: 1em;">Login failed, please try again.</p>
					{/if}
					<div style="margin: 1em;">
						<Textfield
							style="width: 100%"
							type="email"
							bind:invalid={invalidEmail}
							updateInvalid
							bind:value={loginEmail}
							label="Email"
							input$autocomplete="email"
						>
							<svelte:fragment slot="trailingIcon">
								{#if sendingEmail}
									<CircularProgress style="height: 2em; width: 2em;" indeterminate />
								{:else}
									<IconButton
										class="material-icons"
										role="button"
										on:click={async () => {
											if (loginEmail && !invalidEmail) {
												sendingEmail = true;
												await emailLogin(loginEmail);
												sentEmail = true;
											}
										}}>send</IconButton
									>
								{/if}
							</svelte:fragment>
							<HelperText validationMsg slot="helper">Please enter a valid email address</HelperText
							>
						</Textfield>
					</div>
				{/if}
			{:else}
				<div style="display: flex; flex-direction: column;">
					<Button on:click={googleLogin}>
						<Label>Login with Google</Label>
					</Button>
					<Separator />
					<Button on:click={() => (showEmailLogin = true)}>
						<Label>Login with email link</Label>
					</Button>
				</div>
			{/if}
		</MenuSurface>
	</div>
{/if}

<style>
	:global(#loginOptions Button) {
		color: var(--mdc-theme-primary, #6200ee);
	}
	:global(#loadingUser circle) {
		stroke: var(--mdc-theme-on-primary, #fff);
	}
</style>
