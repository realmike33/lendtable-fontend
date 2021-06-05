import React, { useState } from 'react'
import { Header, Modal } from 'semantic-ui-react'
import SigninForm from './signinForm'
import SignupForm from './signupForm'
import { signIn, signUp } from '../../utils/api'

function AuthModal({ isOpen, onSuccess }: { isOpen: boolean; onSuccess: Function }) {
  const [showSignin, setShowSignin] = useState(true)
  const [error, setError] = useState(false)

  const handleOnChange = () => {
    setError(false)
    if (showSignin) {
      setShowSignin(false)
      return
    }
    setShowSignin(true)
  }

  const handleSubmit = async (user: { userName: string; password: string }) => {
    let _error = showSignin ? await signIn(user) : await signUp(user)
    if (_error) {
      setError(_error)
      return
    }
    onSuccess()
  }

  return (
    <Modal open={isOpen}>
      <Modal.Content>
        <Header>{showSignin ? 'Sign In' : 'Sign Up'}</Header>
        <Modal.Description>
          {showSignin && <SigninForm error={error} onSubmit={handleSubmit} onChange={handleOnChange} />}
          {!showSignin && <SignupForm error={error} onSubmit={handleSubmit} onChange={handleOnChange} />}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default AuthModal
