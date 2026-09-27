<template>
	<div class="es-c-t-card">
		<!-- HEADER -->
		<div class="es-c-t-card__header">
			<div class="es-c-t-card__header-img">
				<img src="/assets/img/card.png" alt="Tournament Header" />
			</div>
			<div class="es-c-t-card__header-status">
				<div class="es-c-t-card__header-status-text">
					{{ tournament.status }}
				</div>
			</div>
		</div>

		<!-- BODY -->
		<div class="es-c-t-card__body">
			<div class="es-c-t-card__body-title">
				{{ tournament.name }}
			</div>
			<div class="es-c-t-card__body-description">
				<div class="es-c-t-card__body-description-item">
					<i class="ti ti-calendar fs-base tcn-1"></i>
					<span class="tcn-1 fs-sm">
						{{ formatDate(tournament.startTime) }}
					</span>
				</div>
				<div class="es-c-t-card__body-description-item">
					<i class="ti ti-users fs-base"></i>
					<span class="tcn-6 fs-sm">
						{{ tournament.participantCount }}/{{ tournament.maxPlayers }} Players
					</span>
				</div>
			</div>
		</div>

		<!-- FOOTER -->
		<div class="es-c-t-card__footer">
			<JoinNow :disabled="tournament.status === 'completed' || tournament.isFull" :tournamentId="tournament.id" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ITournamentSummary } from '@/types/tournament'
import { formatDate } from '@/utils/timer'

const props = defineProps<{
	tournament: ITournamentSummary
}>()
</script>

<style lang="scss">
.es-c-t-card {
	background: rgb(var(--n4));
	border: 1px solid rgb(var(--n3));
	border-radius: 1.8rem;
	transition: all 0.7s ease-in-out;
	padding: 1.5rem;
	width: fit-content;
	cursor: pointer;
	min-width: 30rem;

	&__header {
		position: relative;
		margin-bottom: 3rem;

		&-img {
			border-radius: 1.2rem;
			max-height: 23rem;
			width: 100%;
			height: 100%;
			overflow: hidden;

			img {
				transition: all 0.5s ease;
				border-radius: inherit;
				height: 100%;
				width: 100%;

				&:hover {
					transform: scale(1.1);
				}
			}
		}

		&-status {
			position: absolute;
			left: 0;
			bottom: -1rem;
			border-radius: 4.6rem;
			border: 0.1rem solid rgb(var(--s1));
			background: rgb(var(--n4));
			transition: all .5s ease;
			padding: 0.5rem 1.5rem;

			&-text {
				position: relative;
				font-size: 1.6rem;
				font-weight: 600;
				color: var(--n1);
				padding-left: 1.5rem;
				text-transform: capitalize;

				&:before {
					content: "";
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					display: inline-block;
					background: rgb(var(--n1));
					border-radius: 50%;
					width: .6rem;
					height: .6rem;
				}
			}
		}
	}

	&__body {
		margin-bottom: 2rem;

		&-title {
			position: relative;
			font-size: 1.6rem;
			font-weight: 600;
			color: var(--n1);
			padding-bottom: 1rem;

			&:after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 1px;
				background: rgb(var(--n3), .6)
			}
		}

		&-description {
			position: relative;
			@include displayFlex;
			align-items: center;
			gap: 1rem;
			padding: 1rem 0;

			&:after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 1px;
				background: rgb(var(--n3), .6)
			}

			&-item {
				@include displayFlex;
				align-items: center;
				gap: 0.5rem;
				font-size: 1.4rem;
				background: rgb(var(--n3), .6);
				padding: 0.5rem 1rem;
				border-radius: 0.5rem;
			}
		}
	}

	&:hover {
		border: 1px solid rgb(var(--p1));

		.es-c-t-card {
			&__header {
				&-img {
					img {
						transform: scale(1.1);
					}
				}

				&-status {
					background: rgb(var(--p1));
					border: 0.1rem solid rgb(var(--p1));
				}

				&-title {
					color: rgb(var(--p1));
				}
			}

			&-body {
				&-title {
					color: rgb(var(--p1));
				}
			}
		}
	}
}
</style>
