<template>
	<div class="es-c-header-profile">
		<img class="es-c-header-profile__user-logo" src="/assets/img/avatar1.png" alt="profile" />
		<div class="es-c-header-profile__user-name">
			David
		</div>
		<i class="ti ti-chevron-down"></i>
	</div>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
.es-c-header-profile {
	height: 5.2rem;
	@include displayFlex;
	align-items: center;
	gap: 1rem;
	&__user-logo {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	&__user-name {
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--n1);
	}
}
</style>