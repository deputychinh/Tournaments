<template>
  <div class="es-p-tournament-details">
    <Loading v-if="pending" overlay></Loading>
    <TournamentsDetailsSidebar v-if="tournament" class="es-p-tournament-details__sidebar" :tournament="tournament" />
    <TournamentsDetailsBanner v-if="tournament" class="es-p-tournament-details__banner" :tournament="tournament" />
    <Tabs class="es-p-tournament-details__tabs" v-bind="{ tabs: TOURNAMENTS_DETAILS_TABS }"
      v-model:modelValue="activeTab" />
    <TournamentsDetailsBackets class="es-p-tournament-details__backets" :matches="tournament?.matches ?? []" />
  </div>
</template>

<script setup lang="ts">
import { TOURNAMENTS_DETAILS_TABS } from '@/constants'
import { useTournamentDetails } from '@/composables/useTournaments'
// TODO: change to players, winners, rules later
const activeTab = ref(TOURNAMENTS_DETAILS_TABS[0]?.value ?? '')

const route = useRoute()
const id = Number(route.params.id)
const { data: tournament, pending } = await useTournamentDetails(id)
watch(tournament, () => {
  console.log(tournament.value)
})
</script>

<style lang="scss">
.es-p-tournament-details {

  &__sidebar,
  &__banner,
  &__tabs,
  &__backets {
    margin-bottom: 2rem;
  }

}
</style>
