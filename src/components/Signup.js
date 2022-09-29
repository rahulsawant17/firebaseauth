import React, { useState } from "react"


import { FormGroup,FormLabel,TextField, Button, Card, Alert } from '@mui/material';
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {

  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  async function handleSubmit() {




    if (password !== confirmpassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)

      await signup(email, password)

      history.push("/")
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        {/* <Card.Body> */}
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
          <FormGroup id="fname">
              <FormLabel>First Name</FormLabel>
              <TextField type="fname" value={fname}
                onChange={(e) => setFname(e.target.value)} required />
            </FormGroup>
            <FormGroup id="lname">
              <FormLabel>Last Name</FormLabel>
              <TextField type="lname" value={lname}
                onChange={(e) => setLname(e.target.value)} required />
            </FormGroup>
            <FormGroup id="email">
              <FormLabel>Email</FormLabel>
              <TextField type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </FormGroup>
            <FormGroup id="password">
              <FormLabel>Password</FormLabel>
              <TextField type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}required />
            </FormGroup>
            <FormGroup id="password-confirm">
              <FormLabel>Password Confirmation</FormLabel>
              <TextField type="password" value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)} required />
            </FormGroup>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </form>
        {/* </Card.Body> */}
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
