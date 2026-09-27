<template>
	<div @click.stop="handleClick" :class="['es-c-join-now', { disabled }]">
		<span>Join Now</span>
		<i class="ti ti-arrow-right"></i>
		<Modal :open="showLogin" title="Login Required" @close="handleClose">
			<template #body>
				<form class="es-c-join-now__form" @submit.prevent="submitLogin">
					<label class="es-c-join-now__label">
						Name
						<input v-model="form.name" type="text" placeholder="Your full name"
							:class="{ 'is-invalid': touched && errors.name }" @blur="markTouched" />
						<span v-if="touched && errors.name" class="es-c-join-now__error">
							Please enter at least 2 characters.
						</span>
					</label>

					<label class="es-c-join-now__label">
						Email
						<input v-model="form.email" type="email" placeholder="you@example.com"
							:class="{ 'is-invalid': touched && errors.email }" @blur="markTouched" />
						<span v-if="touched && errors.email" class="es-c-join-now__error">
							Please enter a valid email.
						</span>
					</label>
				</form>
			</template>

			<template #footer>
				<button type="button" class="es-c-join-now__btn-cancel" @click.stop="handleClose">Cancel</button>
				<button class="es-c-join-now__btn-submit" :disabled="submitting || !isValid" @click.stop="submitLogin">
					<span v-if="!submitting">Login</span>
					<span v-else>Logging in…</span>
				</button>
			</template>
		</Modal>
	</div>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/useForm'
const props = defineProps<{ disabled?: boolean; tournamentId?: number }>()
const { login, isAuthenticated, user } = useAuth()

const { form, touched, submitting, isValid, errors, markTouched, reset } = useForm<{ name: string; email: string }>(
	{ name: '', email: '' },
	{
		name: (v: string) => v.trim().length >= 2,
		email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
	}
)

const showLogin = ref(false)
const handleOpen = () => (showLogin.value = true)
const handleClose = () => {
	showLogin.value = false
	reset()
}

const handleClick = async () => {
	const playerId = user.value?.playerId
	if (props.disabled || !props.tournamentId) return
	if (!isAuthenticated.value || !playerId) {
		handleOpen()
		return
	}
	try {
		const res = await joinTournament(props.tournamentId, playerId)
		alert(res.message ?? 'Joined successfully!')
	} catch (err: any) {
		alert(err?.statusMessage || 'Failed to join tournament')
	}
}

const submitLogin = async () => {
	touched.value = true
	if (!isValid.value || submitting.value) return
	submitting.value = true
	try {
		await login({ email: form.email, name: form.name })
		handleClose()
		await handleClick()
	} catch {
		alert('Login failed!')
	} finally {
		submitting.value = false
	}
}
</script>

<style lang="scss">
.es-c-join-now {
	position: relative;
	height: 3.6rem;
	border-radius: 2.5rem;
	@include displayFlex;
	align-items: center;
	justify-content: center;
	background: rgb(var(--s1));
	color: rgb(var(--n1));
	transition: all 0.5s ease;
	cursor: pointer;

	i {
		transition: all 0.5s ease;
	}

	&:not(.disabled):hover {
		background: rgb(var(--p1));

		i {
			transform: rotate(-45deg);
		}
	}

	&.disabled {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
	}
}

// form styles
.es-c-join-now__form {
	@include displayFlex;
	flex-direction: column;
	gap: 1rem;
}

.es-c-join-now__label {
	color: var(--n1);
	font-size: 1.4rem;
	display: flex;
	flex-direction: column;
	gap: 0.4rem;

	input {
		background: rgb(var(--n5));
		border: 1px solid rgb(var(--n3));
		color: rgb(var(--n1));
		border-radius: 0.6rem;
		padding: 0.8rem 1rem;
		outline: none;
		transition: var(--transition);

		&:focus {
			border-color: rgb(var(--p1));
			box-shadow: 0 0 0 0.2rem rgba(var(--p1), 0.2);
		}

		&.is-invalid {
			border-color: #ff6b6b;
			box-shadow: 0 0 0 0.2rem rgba(255, 107, 107, 0.2);
		}
	}
}

.es-c-join-now__error {
	color: #ff6b6b;
	font-size: 1.2rem;
}

.es-c-join-now__btn-cancel {
	position: relative;
	@include buttonSlideRight(rgba(var(--n3), 0.5), rgba(var(--n3), 1));
	background: rgba(var(--n3), 0.5);
	color: rgb(var(--n1));
	border: none;
	border-radius: 2.5rem;
	height: 3.6rem;
	padding: 0 1.5rem;
	cursor: pointer;
}

.es-c-join-now__btn-submit {
	position: relative;
	@include buttonSlideRight(rgba(var(--p1), 0.5), rgba(var(--p1), 1));
	background: rgba(var(--p1), 0.5);
	color: rgb(var(--n1));
	border: none;
	border-radius: 2.5rem;
	height: 3.6rem;
	padding: 0 1.5rem;
	cursor: pointer;

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
}
</style>