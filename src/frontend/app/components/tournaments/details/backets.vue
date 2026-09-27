<template>
  <div class="es-c-td-backets">
    <div v-if="rounds.length === 0" class="es-c-td-backets__empty">
      No matches available
    </div>
    <div v-else>
      <div class="es-c-td-backets__round-title">
        <div v-for="round in rounds" :key="round.number" class="es-c-td-backets__round-title-item">
          {{ round.title }}
        </div>
      </div>
      <div class="es-c-td-backets__container">
        <div v-for="(round, index) in rounds" :key="round.number" class="es-c-td-backets__container-round">
          <div v-for="match in round.matches" :key="match.id"
            :class="['es-c-td-backets__container-match', { [`es-c-td-backets__container-match-next`]: index > 0 }]"
            :style="{ '--index': index }">
            <!-- TODO: Use rtl design later -->
            <div class="es-c-td-backets__match-item  rtl">
              <div class="es-c-td-backets__player">
                <div class="es-c-td-backets__player-avatar">
                  <img :src="`/assets/img/treeview.png`" :alt="match.player1?.username || 'TBD'" />
                </div>
                <span class="es-c-td-backets__player-name">
                  {{ match.player1?.username || 'TBD' }}
                </span>
              </div>
              <span v-if="match.winner && match.winner.id === match.player1?.id" class="es-c-td-backets__score">
                <i class="ti ti-trophy"></i>
              </span>
            </div>
            <div class="es-c-td-backets__match-item-vs">
              {{ match.scheduledAt ? formatDate(match.scheduledAt) : 'TBD' }}
            </div>
            <div class="es-c-td-backets__match-item">
              <div class="es-c-td-backets__player">
                <div class="es-c-td-backets__player-avatar">
                  <img :src="`/assets/img/treeview.png`" :alt="match.player2?.username || 'TBD'" />
                </div>
                <span class="es-c-td-backets__player-name">
                  {{ match.player2?.username || 'TBD' }}
                </span>
              </div>
              <span v-if="match.winner && match.winner.id === match.player2?.id" class="es-c-td-backets__score">
                <i class="ti ti-trophy"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMatch } from '@/types/tournament'
const props = withDefaults(defineProps<{
  matches?: IMatch[]
}>(), {
  matches: () => []
})

// TODO: Group matches by round will add a composable later
const rounds = computed(() => {
  if (!props.matches || props.matches.length === 0) {
    return []
  }

  const grouped = props.matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = []
    }
    acc[match.round]?.push(match)
    return acc
  }, {} as Record<number, IMatch[]>)

  const roundNumbers = Object.keys(grouped).map(Number).sort((a, b) => a - b)
  const maxRound = Math.max(...roundNumbers)

  return roundNumbers.map((round) => {
    const matches = grouped[round]
    const roundIndex = maxRound - round + 1

    let title = ''
    let className = ''

    if (roundIndex === 1) {
      title = 'Final'
      className = 'final'
    } else if (roundIndex === 2) {
      title = 'Semi Finals'
      className = 'semi'
    } else if (roundIndex === 3) {
      title = 'Quarter Finals'
      className = 'quarter'
    } else if (roundIndex === 4) {
      title = 'Round of 16'
      className = 'round16'
    } else if (roundIndex === 5) {
      title = 'Round of 32'
      className = 'round32'
    } else {
      title = `Round ${roundIndex}`
      className = `round-${roundIndex}`
    }
    return {
      number: round,
      title,
      className,
      matches: matches?.sort((a, b) => a.matchNumber - b.matchNumber) || []
    }
  })
})

</script>

<style lang="scss">
.es-c-td-backets {
  // @at-root #{&} .rtl {
    
  // }
  @include displayFlex;
  flex-flow: column;
  gap: 2rem;

  &__empty {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--n1);
    text-align: center;
  }

  &__round-title {
    @include displayFlex;
    align-items: center;
    gap: 5rem;

    &-item {
      font-size: 1.8rem;
      font-weight: 600;
      padding: 2.5rem;
      color: var(--n1);
      text-align: center;
      flex: 1;
      background: rgb(var(--n4));
      border-radius: 0.8rem;
    }
  }

  &__container {
    @include displayFlex;
    overflow-x: auto;
    padding: 2rem 0;
    gap: 5rem;
    width: 100%;

    &-round {
      @include displayFlex;
      flex-direction: column;
      gap: 5rem;
      min-width: 25rem;
      position: relative;
      flex: 1;
    }

    &-match {
      @include displayFlex;
      flex-direction: column;
      gap: 0.5rem;
      min-width: 25rem;
      position: relative;
      flex: 1;
    }

    &-match-next {
      @include displayFlex;
      justify-content: center;

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: -3rem;
        transform: translate(-50%, -50%);
        width: 10%;
        height: calc(50% + 2.5rem);
        z-index: -1;
        border: 0.2rem solid rgb(var(--n3));
        border-left: none;
        border-radius: 10px;
      }

      &:after {
        content: "";
        position: absolute;
        width: 10%;
        height: 0.2rem;
        left: -1.5rem;
        border: none;
        background: rgb(var(--n3));
      }
    }
  }

  &__match {
    &-item {
      @include displayFlex;
      align-items: center;
      background: rgb(var(--n4));
      border-right: 0.5rem solid rgb(var(--n3));
      border-radius: 1rem;
      padding: 1rem;

      &-vs {
        @include alignJustifyCenter;
        text-align: center;
        font-size: 1.4rem;
        font-weight: 600;
        color: rgb(var(--n1));
      }
    }
  }

  &__player {
    @include displayFlex;
    align-items: center;
    gap: 1rem;
    flex: 1;

    &-avatar {
      @include displayFlex;
      align-items: center;
      justify-content: center;
      width: 4.8rem;
      height: 4.8rem;
      border-radius: 50%;
      overflow: hidden;
      background: rgb(var(--n4));

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-name {
      font-size: 1.4rem;
      font-weight: 600;
      color: rgb(var(--n1));
      flex: 1;
    }
  }
}
</style>