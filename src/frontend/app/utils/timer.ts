export const getTimeRemaining = (targetDate: Date) => {
	// TODO will be make new date as singleton desgin patter in the future
	const now = new Date().getTime()
	const difference = targetDate.getTime() - now

	if (difference <= 0) {
		return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
	}

	const seconds = Math.floor((difference % (1000 * 60)) / 1000)
	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
	const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	const days = Math.floor(difference / (1000 * 60 * 60 * 24))
	const years = Math.floor(days / 365)

	return { years, days, hours, minutes, seconds }
}
export const formatDate = (date: string | Date) => {
	const d = new Date(date)
	return d.toLocaleString(undefined, {
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	})
}