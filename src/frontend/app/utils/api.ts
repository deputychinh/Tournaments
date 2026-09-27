import { useRuntimeConfig } from '#imports'

export const apiUrl = (path: string): string => {
	const config = useRuntimeConfig()
	return `${config.public.apiBase}${path}`
}
export const buildQuery = <T extends Record<string, any>>(params: Partial<T>) => {
	const searchParams = new URLSearchParams()
	Object.entries(params).forEach(([key, value]) => {
	  if (value !== undefined && value !== '') {
		searchParams.set(key, String(value))
	  }
	})
	return searchParams.toString() ? `?${searchParams.toString()}` : ''
}