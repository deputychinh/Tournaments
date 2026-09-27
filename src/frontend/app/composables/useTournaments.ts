import { useFetch } from '#app'
import { $fetch } from 'ofetch'
import { apiUrl } from '@/utils/api'
import type { ITournamentSummary, ITournamentDetail, IJoinTournamentResponse, ITournamentQuery} from '@/types/tournament'


export function useTournaments(filters: Ref<ITournamentQuery>) {
  return useFetch<ITournamentSummary[]>(() => {
    const query = buildQuery(filters.value)
    return apiUrl(`/tournaments${query}`)
  }, {
    key: () => `tournaments-${filters.value.page ?? 1}-${filters.value.status ?? 'all'}-${filters.value.search ?? ''}`,
    lazy: true,
    default: () => [],
  })
}

export function useTournamentDetails(id: number) {
  return useFetch<ITournamentDetail>(apiUrl(`/tournaments/${id}`), {
    key: `tournament-${id}`,
    lazy: true,
  })
}

export async function joinTournament(id: number, playerId: number) {
  const { accessToken, refresh } = useAuth()
  try {
    return await $fetch<IJoinTournamentResponse>(apiUrl(`/tournaments/${id}/join`), {
      method: 'POST',
      body: { playerId },
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })
  } catch (error: any) {
    // TODO: Handle expired token (optional)
    if (error?.response?.status === 401) {
      const newToken = await refresh()
      if (newToken) {
        return await $fetch<IJoinTournamentResponse>(apiUrl(`/tournaments/${id}/join`), {
          method: 'POST',
          body: { playerId },
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        })
      }
    }
    // TODO: Hander error with fiendly UI
    console.error('Join tournament failed:', error)
    throw createError({
      statusCode: error?.response?.status || 400,
      statusMessage: error?.data?.message || 'Failed to join tournament',
    })
  }
}