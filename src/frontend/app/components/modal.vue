<template>
	<div v-if="open" class="es-c-modal" @click.self="close">
		<div class="es-c-modal__card" role="dialog" aria-modal="true" ref="cardRef">
			<!-- Header -->
			<header class="es-c-modal__header" v-if="title || showClose">
				<h3 v-if="title" id="modal-title">{{ title }}</h3>
				<button v-if="showClose" class="es-c-modal__close" type="button" aria-label="Close" @click.stop="close">
					<i class="ti ti-x"></i>
				</button>
			</header>

			<!-- Body slot -->
			<section class="es-c-modal__body">
				<slot name="body" />
			</section>

			<!-- Footer slot -->
			<footer v-if="$slots.footer" class="es-c-modal__footer">
				<slot name="footer" />
			</footer>
		</div>
	</div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const props = withDefaults(
	defineProps<{
		open: boolean
		title?: string
		showClose?: boolean
	}>(),
	{ title: '', showClose: true }
)

const emit = defineEmits<{ (e: 'close'): void }>()
const close = () => emit('close')

const cardRef = ref<HTMLElement | null>(null)
// Autofocus modal card
watch(
	() => props.open,
	(val) => {
		if (val) {
			nextTick(() => cardRef.value?.focus?.())
		}
	}
)
</script>

<style lang="scss">
.es-c-modal {
	position: fixed;
	inset: 0;
	background: rgba(var(--n0), 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.6rem;
	z-index: 1000;

	&__card {
		background: rgb(var(--n4));
		border: 1px solid rgb(var(--n3));
		border-radius: 1.2rem;
		width: 100%;
		max-width: 38rem;
		padding: 1.6rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
		outline: none;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.2rem;

		h3 {
			margin: 0;
			font-size: 1.8rem;
			color: var(--n1);
		}
	}

	&__close {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.6rem;
		color: rgb(var(--n1));
	}

	&__body {
		margin: 1rem 0;
	}

	&__footer {
		margin-top: 1.2rem;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
}
</style>