const storageKey = 'fantasyApp'
export const setToken = (token: string) => {
  const localStorage = window.localStorage
  localStorage.setItem(storageKey, token)
}

export const getToken = () => {
  return localStorage.getItem(storageKey) || ''
}
