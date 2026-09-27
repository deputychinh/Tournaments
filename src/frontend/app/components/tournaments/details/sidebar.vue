<template>
	<div class="es-c-td-sidebar">
		<div class="es-c-td-sidebar__icon" @click="navigateTo('/')">
			<i class="ti ti-arrow-narrow-left"></i>
		</div>
		<div class="es-c-td-sidebar__title">
			{{ tournament.name }}
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ITournamentDetail } from '@/types/tournament'
const props = withDefaults(defineProps<{
	tournament: ITournamentDetail
}>(), {
	tournament: () => ({}) as ITournamentDetail
})
</script>

<style lang="scss">
.es-c-td-sidebar {
	@include displayFlex;
	align-items: center;
	&__icon {
		margin-right: 1rem;
		cursor: pointer;
		font-size: 3.2rem;
	}
	&__title {
		font-size: 2.4rem;
		font-weight: 600;
	}
}
</style>