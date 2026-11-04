import Dialog from '@mui/material/Dialog'
import LoginForm from '../LoginForm'

export default function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" aria-labelledby="login-dialog-title">
      <LoginForm onClose={onClose} />
    </Dialog>
  )
}
