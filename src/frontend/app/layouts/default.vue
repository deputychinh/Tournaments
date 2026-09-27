<template>
	<div class="es-l">
		<Header class="es-l-header" />
		<main class="es-l-main">
			<slot />
		</main>
		<Footer class="es-l-footer" />
	</div>
</template>

<script setup lang="ts">
const { setPageMeta } = usePageTitle()

// Automatically set page meta based on current route
watch(() => useRoute().name, () => {
	setPageMeta()
}, { immediate: true })
</script>


<style lang="scss">
.es-l {
	min-height: 100vh;
	@include displayFlex;
	flex-direction: column;
	align-items: center;

	&-header {
		width: 100%;
		height: 12rem;
	}

	&-main {
		margin: 12rem 5rem;
		max-width: 144rem;
		padding-top: 2rem;
	}

	&-footer {
		width: 100%;
		height: 6rem;
	}
}

.page-enter-active,
.page-leave-active {
	transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
}
</style>