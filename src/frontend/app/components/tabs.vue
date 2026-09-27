<template>
	<div class="es-c-tabs">
		<div v-for="tab in props.tabs" :key="tab.value" class="es-c-tabs__tab"
			:class="{ 'es-c-tabs__tab--active': modelValue === tab.value }" @click="onClick(tab.value)">
			{{ tab.label }}
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	tabs: {
		label: string;
		value: string;
	}[];
	modelValue: string
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const onClick = (value: string) => {
	emit('update:modelValue', value)
}
</script>

<style lang="scss">
.es-c-tabs {
	@include displayFlex;
	align-items: center;
	gap: 1rem;

	&__tab {
		@include buttonSlideRight(rgba(var(--n4), 1), rgba(var(--p1), 1));
		position: relative;
		padding: 1rem 2rem;
		border: 0;
		font-size: 1.6rem;
		font-weight: 500;
		color: var(--n1);
		cursor: pointer;
		border-radius: 2.5rem;

		&--active {
			color: var(--p1);
			background: rgb(var(--p1));
		}
	}
}
</style>