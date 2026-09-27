<template>
	<header class="es-c-h">
		<div class="es-c-h-logo" @click="navigateTo('/')">
			<img src="/assets/img/favicon.png" alt="logo" />
			<div class="es-c-h-logo__text">
				Zengaming
			</div>
		</div>
		<div class="es-c-h-actions">
			<HeaderWallet />
			<HeaderNotification />
			<HeaderProfile />
		</div>
	</header>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.es-c-h {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	@include displayFlex;
	align-items: center;
	background-color: rgb(var(--n4));
	padding: 0 5rem;
	z-index: 1000;
	&-logo {
		flex: 1;
		@include displayFlex;
		align-items: center;
		height: 100%;

		img {
			width: 4.8rem;
			height: 4.8rem;
		}

		&__text {
			margin-left: 1.6rem;
			font-size: 2.4rem;
			color: rgb(var(--n1));
			@include mobile {
				display: none;
			}
		}
	}

	&-actions {
		@include displayFlex;
		align-items: center;
		gap: 2.5rem;
	}
}
</style>