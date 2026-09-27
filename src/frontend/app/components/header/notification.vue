<template>
	<div class="es-c-header-notification">
		<Button classes="es-c-header-notification__icon">
			<i class="ti ti-bell-filled"></i>
		</Button>
	</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.es-c-header-notification {
	position: relative;
	height: 5.2rem;
	width: 5.2rem;

	&__icon {
		@include buttonCircleSlide;
		@include alignJustifyCenter;
		border-radius: 50%;
		font-size: 2.4rem;
		height: 100%;
		width: 100%;
		color: var(--n1);
	}
}
</style>