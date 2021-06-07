const storageKey = 'fantasyApp'
export const setToken = (token: string) => {
  const localStorage = window.localStorage
  localStorage.setItem(storageKey, token)
}

export const getToken = () => {
  const localStorage = window.localStorage
  return localStorage.getItem(storageKey) || ''
}
