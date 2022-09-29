import React, {  useState } from "react"

import { FormGroup,FormLabel,TextField, Button, Card, Alert } from '@mui/material';
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  async function handleSubmit() {


    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>

          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
            <FormGroup id="email">
              <FormLabel>Email</FormLabel>
              <TextField type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}  required />
            </FormGroup>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
  
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
