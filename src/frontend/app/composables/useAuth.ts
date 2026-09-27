import { $fetch } from 'ofetch'
import { apiUrl } from '@/utils/api'
import type { ILoginRequest, ILoginResponse, IRefreshResponse, TJwtPayload } from '@/types/auth'
import { jwtDecode } from 'jwt-decode'

export const useAuth = () => {
	const accessToken = useCookie<string | null>('access_token')
	const refreshToken = useCookie<string | null>('refresh_token')
	const user = useCookie<TJwtPayload | null>('auth_user')
	const login = async (payload: ILoginRequest) => {
	  const res = await $fetch<ILoginResponse>(apiUrl('/auth/login'), {
		method: 'POST',
		body: payload,
	  })
	  accessToken.value = res.accessToken
	  refreshToken.value = res.refreshToken
	  user.value = res.accessToken ? jwtDecode<TJwtPayload>(res.accessToken) : null
	  return res
	}
  
	const refresh = async () => {
	  if (!refreshToken.value) return null
	  try {
		const res = await $fetch<IRefreshResponse>(apiUrl('/auth/refresh'), {
		  method: 'POST',
		  body: { refreshToken: refreshToken.value },
		})
		accessToken.value = res.accessToken
		return res.accessToken
	  } catch {
		logout()
		return null
	  }
	}
  
	const logout = () => {
	  accessToken.value = null
	  refreshToken.value = null
	  user.value = null
	}
  
	const isAuthenticated = computed(() => !!accessToken.value)
  
	return { accessToken, refreshToken, user, isAuthenticated, login, refresh, logout }
  }