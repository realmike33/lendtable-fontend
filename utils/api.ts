import { getToken, setToken } from './localstorage'
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const signIn = async (user: { userName: string; password: string }): Promise<boolean> => {
  try {
    const data = await fetch(apiUrl + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => response.json())
    setToken(data.token)
    return false
  } catch (e) {
    return true
  }
}

export const signUp = async (user: { userName: string; password: string }): Promise<boolean> => {
  try {
    const data = await fetch(apiUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => response.json())
    setToken(data.token)
    return false
  } catch (e) {
    return true
  }
}
