<template>
	<div v-if="overlay" class="es-c-loading__overlay" role="status" aria-live="polite">
		<div class="es-c-loading">
			<div class="es-c-loading__spinner" :style="{'--size': size}" />
			<div v-if="text" class="es-c-loading__text">{{ text }}</div>
		</div>
	</div>
	<div v-else class="es-c-loading" role="status" aria-live="polite">
		<div class="es-c-loading__spinner" :style="{'--size': size}" />
		<div v-if="text" class="es-c-loading__text">{{ text }}</div>
	</div>
</template>

<script setup lang="ts">
import type { TSize } from '~/types/general'

const props = withDefaults(defineProps<{
	overlay?: boolean
	text?: string
	size?: TSize
}>(), {
	show: true,
	overlay: false,
	text: '',
	size: 'md',
})
</script>

<style lang="scss" scoped>
.es-c-loading__overlay {
	position: fixed;
	inset: 0;
	background: rgba(var(--n0), .4);
	backdrop-filter: blur(2px);
	@include alignJustifyCenter;
	z-index: 1000;
}

.es-c-loading {
	@include alignJustifyCenter;
	flex-direction: column;
	gap: .8rem;

	&__text {
		color: rgb(var(--n6));
		font-size: 1.4rem;
	}

	&__spinner {
		border: .3rem solid rgba(var(--n6), .25);
		border-top-color: rgb(var(--p1));
		border-radius: 50%;
		animation: es-spin 0.8s linear infinite;

		&[style*="--size: sm"] {
			width: 5rem;
			height: 5rem;
		}

		&[style*="--size: md"] {
			width: 10rem;
			height: 10rem;
		}

		&[style*="--size: lg"] {
			width: 15rem;
			height: 15rem;
		}
	}
}

@keyframes es-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>