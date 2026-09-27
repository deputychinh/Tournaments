export const useForm = <T extends Record<string, any>>(
	initialValues: T,
	rules: Partial<Record<keyof T, (val: any) => boolean>> = {}
) => {
	const form = reactive({ ...initialValues }) as T
	const touched = ref(false)
	const submitting = ref(false)

	const isValid = computed(() =>
		Object.entries(rules).every(([k, fn]) => !fn || fn(form[k as keyof T]))
	)

	const errors = computed(() => {
		const out: Partial<Record<keyof T, boolean>> = {}
		for (const k in rules) {
			const fn = rules[k]
			if (fn) out[k] = !fn(form[k])
		}
		return out
	})

	const markTouched = () => (touched.value = true)
	const reset = () => {
		Object.assign(form, initialValues)
		touched.value = false
		submitting.value = false
	}

	return { form, touched, submitting, isValid, errors, markTouched, reset }
}