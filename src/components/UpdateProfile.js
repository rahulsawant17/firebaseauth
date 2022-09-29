import React, {  useState } from "react"
// import { Form,Button, Card, Alert} from "react-bootstrap"
import { FormGroup,FormLabel,TextField, Button, Card, Alert } from '@mui/material';
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit() {

    if (password !==confirmpassword) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (email !== currentUser.email) {
      promises.push(updateEmail(email))
    }
    if (password) {
      promises.push(updatePassword(password))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
            <FormGroup id="email">
              <FormLabel>Email</FormLabel>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                defaultValue={currentUser.email}
              />
            </FormGroup>
            <FormGroup id="password">
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </FormGroup>
            <FormGroup id="password-confirm">
              <FormLabel>Password Confirmation</FormLabel>
              <TextField
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </FormGroup>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </form>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}
