<template>
	<div class="es-c-header-wallet">
		<div class="es-c-header-wallet__icon"><i class="ti ti-wallet"></i>
		</div>
		<div class="es-c-header-wallet__text">Connect Wallet</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
/* Base component */
.es-c-header-wallet {
	height: 5.2rem;
	position: relative;
	flex-shrink: 0;
	@include displayFlex;
	align-items: center;
	@include buttonSlideRight;
	border-radius: 3rem;
	padding: 0.5rem 2rem 0.5rem 0.5rem;
	gap: 1rem;

	@include mobile {
		padding: 0.5rem;
		background: rgb(var(--p1));
	}

	&__icon {
		font-size: 2.4rem;
		width: 4.2rem;
		height: 4.2rem;
		border-radius: 50%;
		background: rgb(var(--p1));
		@include alignJustifyCenter;
	}

	&__text {
		@include mobile {
			display: none;
		}
	}
}
</style>