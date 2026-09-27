<template>
	<div class="es-c-td-banner">
		<img class="es-c-td-banner__img" src="/assets/img/details/banner.png" alt="Banner" />
		<div class="es-c-td-banner__content">
			<div class="es-c-td-banner__content-thumbnail">
				<img src="/assets/img/details/thumbnail.png" alt="Banner" />
			</div>
			<div class="es-c-td-banner__content-info">
				<div class="es-c-td-banner__content-info-title">
					{{ tournament.name }}
				</div>
				<div class="es-c-td-banner__content-info-description">
					Tournament ending in {{ formatDate(tournament.startTime) }}
				</div>
				<div class="es-c-td-banner__content-info-date">
					<DateBox :value="timeRemaining.days" :label="'Days'" :type="'down'" />
					<DateBox :value="timeRemaining.hours" :label="'Hours'" :type="'down'" />
					<DateBox :value="timeRemaining.minutes" :label="'Minutes'" :type="'down'" />
					<DateBox :value="timeRemaining.seconds" :label="'Seconds'" :type="'down'" />
				</div>
				<div class="es-c-td-banner__content-info-actions">
					<JoinNow class="es-c-td-banner__content-info-actions-join"
						:disabled="tournament.status === 'completed' || tournament.isFull"
						:tournamentId="tournament.id" />
					<div class="es-c-td-banner__content-info-actions-date">
						{{ formatDate(tournament.startTime) }}
					</div>
					<div class="es-c-td-banner__content-info-actions-players">
						<i class="ti ti-users-group"></i>
						<span>{{ tournament.participantCount }}/{{ tournament.maxPlayers }} Players</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCountdown } from '@/composables/useCountDown'
import type { ITournamentDetail } from '@/types/tournament'
const props = withDefaults(defineProps<{
	tournament: ITournamentDetail
}>(), {
	tournament: () => ({
	}) as ITournamentDetail
})
const { timeRemaining, start, stop } = useCountdown(new Date('2025-10-07T05:10:00'))

onMounted(() => {
	start()
})
onBeforeUnmount(() => {
	stop()
})
</script>

<style lang="scss">
// TODO: Add responsive styles
.es-c-td-banner {
	position: relative;
	@include displayFlex;
	overflow: hidden;
	border-radius: 1.2rem;

	&__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__content {
		position: absolute;
		top: 0;
		left: 0;
		@include displayFlex;
		align-items: center;
		width: 100%;
		height: 100%;

		&-thumbnail {
			height: 100%;
			width: 50%;
			object-fit: cover;
		}

		&-info {
			@include displayFlex;
			flex-flow: column;
			width: 100%;
			height: 100%;
			padding: 2.5rem 5rem;

			&-title {
				font-size: 3.2rem;
				font-weight: 600;
				color: rgb(var(--n1));
				margin-bottom: 2.5rem;
			}

			&-description {
				font-size: 1.6rem;
				font-weight: 500;
				color: rgb(var(--n1));
				margin-bottom: 1.5rem;
			}

			&-date {
				@include displayFlex;
				align-items: center;
				gap: 1.5rem;
				margin-bottom: 2.5rem;
			}

			&-actions {
				@include displayFlex;
				align-items: center;
				gap: 2rem;

				&-join {
					flex: 1;
					max-width: 15rem;
				}

				&-players,
				&-date {
					@include displayFlex;
					align-items: center;
					color: rgb(var(--n6));
					font-size: 1.6rem;
					font-weight: 500;
				}
			}

		}

	}
}
</style>