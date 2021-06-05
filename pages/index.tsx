import React, { useEffect, useState } from 'react'
import AuthModal from './components/authModal'
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

  const handleAuthSuccess = () => {
    setShowAuth(false)
  }

  return (
    <div>
      <AuthModal isOpen={showAuth} onSuccess={handleAuthSuccess} />
    </div>
  )
}
