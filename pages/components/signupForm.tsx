import React, { useState } from 'react'
import { Form, Message } from 'semantic-ui-react'

function SignupForm({ error, onSubmit, onChange }: { error: boolean; onSubmit: Function; onChange: Function }) {
  const [userInfo, setUserInfo] = useState({ userName: '', password: '' })
  return (
    <Form size="large" onSubmit={() => onSubmit(userInfo)} error={error}>
      <Form.Input fluid label="Username" placeholder="Username" onChange={(e) => setUserInfo((prevState) => ({ ...prevState, userName: e.target.value }))} required />
      <Form.Input type="password" fluid label="Password" placeholder="Password" onChange={(e) => setUserInfo((prevState) => ({ ...prevState, password: e.target.value }))} required />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault()
            onChange()
          }}
        >
          Click here to sign in
        </a>
      </div>
      <Form.Button>Sign Up</Form.Button>
      <Message error={error} warning header="Could Not Signup!" content="Try again with different username or try signing in." />
    </Form>
  )
}

export default SignupForm
