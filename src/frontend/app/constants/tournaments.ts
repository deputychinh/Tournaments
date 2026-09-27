import type { TTournamentStatus } from '@/types/tournament'
export const TOURNAMENTS_TABS: { label: string, value: TTournamentStatus }[] = [
	{
		label: 'All',
		value: 'all',
	},
	{
		label: 'Ongoing',
		value: 'ongoing',
	},
	{
		label: 'Scheduled',
		value: 'scheduled',
	},
	{
		label: 'Completed',
		value: 'completed',
	},
]

export const TOURNAMENTS_DETAILS_TABS: { label: string, value: string }[] = [
	{
		label: 'Backets',
		value: 'backets',
	},
	{
		label: 'Players',
		value: 'players',
	},
	{
		label: 'Winners',
		value: 'winners',
	},
	{
		label: 'Rules',
		value: 'rules',
	},

]