import React, { useState } from "react"

import {FormGroup,FormLabel,TextField,  Button, Card, Alert } from '@mui/material';
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {

  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {


    try {
      setError("")
      setLoading(true)
      await login(email, password)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>

          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
            <FormGroup id="email">
              <FormLabel>Email</FormLabel>
              <TextField type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />

            </FormGroup>
            <FormGroup id="password">
              <FormLabel>Password</FormLabel>

              <TextField type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </FormGroup>
            <Button

              disabled={loading} className="w-100" type="submit">
              Log In
            </Button>

          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )

   

}
