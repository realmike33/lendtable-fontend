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

export const getAllCharacters = async () => {
  const token = getToken()
  try {
    const data = await fetch(apiUrl + '/characters', {
      method: 'GET',
      headers: {
        authorization: token,
      },
    }).then((response) => response.json())
    return data.data
  } catch (e) {
    // do someting with error
    console.log(e)
  }
}

export const createCharacter = async (character: { name: string; stats: { str: number; dex: number; con: number; int: number; wis: number; cha: number } }) => {
  const token = getToken()
  try {
    const data = await fetch(apiUrl + '/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify(character),
    }).then((response) => response.json())
    return data.data
  } catch (e) {
    return true
  }
}

export const getCharacter = async (charId: string) => {
  const token = getToken()
  try {
    const data = await fetch(apiUrl + `/characters/${charId}`, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    }).then((response) => response.json())
    return data.data
  } catch (e) {
    // do someting with error
    console.log(e)
  }
}

export const updateCharacter = async (charId: string, character: { name: string; stats: { str: number; dex: number; con: number; int: number; wis: number; cha: number } }) => {
  const token = getToken()
  try {
    const data = await fetch(apiUrl + `/characters/${charId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify(character),
    })
    return false
  } catch (e) {
    // do someting with error
    console.log(e)
    return true
  }
}

export const deleteCharacter = async (charId: string) => {
  const token = getToken()
  try {
    await fetch(apiUrl + `/characters/${charId}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    })
    return false
  } catch (e) {
    // do someting with error
    console.log(e)
    return true
  }
}
