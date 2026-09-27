import { getTimeRemaining } from '@/utils/timer'
export const useCountdown = (targetDate: Date) => {
	// TODO will be make count down as singleton desgin patter in the future
	const timeRemaining = ref(getTimeRemaining(targetDate))
	let intervalId: ReturnType<typeof setInterval> | number | null = null

	const start = () => {
		intervalId = setInterval(() => {
			timeRemaining.value = getTimeRemaining(targetDate)
		}, 1000)
	}

	const stop = () => {
		if (intervalId) {
			clearInterval(intervalId)
			intervalId = null
		}
	}

	onBeforeUnmount(() => {
		stop()
	})

	return {
		timeRemaining: readonly(timeRemaining),
		start,
		stop
	}
}