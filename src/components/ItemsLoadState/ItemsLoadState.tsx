import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import { useItems } from '../../context/items'

// Spinner while items load, or an error with a retry button. Renders nothing once they're loaded.
export default function ItemsLoadState() {
  const { status, retry } = useItems()
  if (status === 'ready') return null

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', py: 8, textAlign: 'center' }}>
      {status === 'loading' ? (
        <CircularProgress aria-label="Loading items" />
      ) : (
        <>
          <CloudOffIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
          <Typography variant="h6">Couldn&apos;t load the items</Typography>
          <Typography color="text.secondary">Check your connection and try again.</Typography>
          <Button variant="contained" onClick={retry}>
            Try again
          </Button>
        </>
      )}
    </Stack>
  )
}
