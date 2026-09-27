export const usePageTitle = () => {
	const route = useRoute()

	// Get page title
	const getPageTitle = (routeName?: string): string => {
		const titleConfig = {
			// Page titles
			'index': 'Tournaments',
			'error': 'Error'
		}
		const name = routeName || route.name as string
		return titleConfig[name as keyof typeof titleConfig]
	}

	// Get page description
	const getPageDescription = (routeName?: string): string => {
		const descriptions: Record<string, string> = {
			'index': 'Discover and join the best gaming tournaments on Zengaming',
			'error': 'Error'
		}
		const name = routeName || route.name as string
		return descriptions[name] || 'Join the ultimate gaming community on Zengaming'
	}

	// Reactive page title
	const pageTitle = computed(() => getPageTitle())

	// Set head meta
	const setPageMeta = (customTitle?: string, customDescription?: string) => {
		const title = customTitle || getPageTitle()
		const description = customDescription || getPageDescription()
		useHead({
			title,
			meta: [
				{ name: 'description', content: description },
				{ property: 'og:title', content: title },
				{ property: 'og:description', content: description },
				{ property: 'og:type', content: 'website' },
				{ name: 'twitter:title', content: title },
				{ name: 'twitter:description', content: description }
			]
		})
	}

	return {
		pageTitle,
		getPageTitle,
		getPageDescription,
		setPageMeta
	}
}
