<template>
	<div class="es-c-date-box">
		<div :class="`es-c-date-box__value es-c-date-box__value--${type}`">
			{{ value }}
		</div>
		<div class="es-c-date-box__label">
			{{ label }}
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	onClick?: () => void;
	value: number;
	label: string;
	type: string;
}>()
</script>

<style lang="scss">
.es-c-date-box {
	@include displayFlex;
	flex-direction: column;
	align-items: center;
	width: 8rem;
	&__value {
		width: 100%;
		height: 8rem;
		border-radius: 20%;
		@include alignJustifyCenter;
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
		background: rgb(var(--p1));
		margin-bottom: 1rem;
		font-size: 3.2rem;
		color: rgb(var(--n1));
	}

	&__label {
		font-size: 1.6rem;
		font-weight: 500;
	}
}
</style>