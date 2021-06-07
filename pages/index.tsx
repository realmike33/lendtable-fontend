import React, { useEffect, useState } from 'react'
import Banner from '../components/banner'
import AuthModal from '../components/authModal'
import CharactersTable from '../components/charactersTable'
import { getUser } from '../utils/api'
import { getToken } from '../utils/localstorage'

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState({ id: '', userName: '' })
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setShowAuth(true)
    }

    if (token && !user.id) {
      ;(async () => {
        const user = await getUser()
        setShowAuth(false)
        setUser(user)
      })()
    }
  }, [showAuth])

  return (
    <div>
      <AuthModal isOpen={showAuth} onSuccess={() => setShowAuth(false)} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0', alignItems: 'center', width: '50%', margin: '0 auto' }}>
        <Banner />
        {!showAuth && <CharactersTable user={user} />}
      </div>
    </div>
  )
}
