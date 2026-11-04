import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router'
import { AuthError } from '@supabase/supabase-js'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useAuth } from '../../context/auth'
import { errorMessage } from '../../utils/errorMessage'

const LOGIN_ERRORS: Partial<Record<string, string>> = {
  invalid_credentials: 'Wrong email or password.',
  email_not_confirmed: 'This email address has not been confirmed yet.',
}

// The content of LoginDialog. It's mounted only while the dialog is open, so the fields and error
// start empty every time it opens.
export default function LoginForm({ onClose }: { onClose: () => void }) {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await signIn(email.trim(), password)
      onClose()
      navigate('/')
    } catch (err) {
      const known = err instanceof AuthError && err.code ? LOGIN_ERRORS[err.code] : undefined
      setError(known ?? errorMessage(err, 'Logging in failed. Try again.'))
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle id="login-dialog-title">Admin login</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" loading={submitting}>
          Log in
        </Button>
      </DialogActions>
    </form>
  )
}
