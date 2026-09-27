<template>
  <div class="es-p-landing">
    <div class="es-p-landing__title">Tournaments</div>
    <Tabs class="es-p-landing__tabs" v-bind="{ tabs: TOURNAMENTS_TABS }"
      v-model:modelValue="status" />
    <div class="es-p-landing__cards">
      <Loading v-if="pending" overlay></Loading>
      <TournamentsCard @click="navigateTo(`/tournaments/${tournament.id}`)" v-for="(tournament, index) in tournaments" :key="`tournament-${index}`" :tournament="tournament" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TOURNAMENTS_TABS } from '@/constants'

const status = ref(TOURNAMENTS_TABS[0]?.value ?? '')
// TODO: filters for tournaments with more conditions
const filters = computed(() => ({
  status: status.value !== 'all' ? status.value : undefined,
}))

const { data: tournaments, pending } = useTournaments(filters)
</script>

<style lang="scss">
.es-p-landing {
  &__title {
    font-size: 3.2rem;
    font-weight: 600;
    color: var(--n1);
  }

  &__tabs {
    margin: 2rem 0;
  }

  &__cards {
    @include responsive-grid($mobile-cols: 1, $tablet-cols: 2, $desktop-cols: 3, $gap: 1.5rem);

    @include mobile {
      gap: 1rem;
    }
  }
}
</style>