import React, { useEffect, useState } from 'react'
import Banner from '../components/banner'
import AuthModal from '../components/authModal'
import CharactersTable from '../components/charactersTable'
import { getToken } from '../utils/localstorage'

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setShowAuth(true)
    } else {
      setShowAuth(false)
    }
  })

  return (
    <div>
      <AuthModal isOpen={showAuth} onSuccess={() => setShowAuth(false)} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0', alignItems: 'center', width: '50%', margin: '0 auto' }}>
        <Banner />
        {!showAuth && <CharactersTable />}
      </div>
    </div>
  )
}
