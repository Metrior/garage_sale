import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { ADDRESS } from '../../config'

// Keyless Google Maps embed that searches for the address and drops a pin on it.
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`
const COPIED_RESET_MS = 2000

export default function LocationPage() {
  const [copied, setCopied] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const showMessage = (message: string) => {
    setSnackbarMessage(message)
    setSnackbarOpen(true)
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS)
      setCopied(true)
      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS)
      showMessage('Address copied')
    } catch {
      showMessage("Couldn't copy the address. Select it and copy it manually.")
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Location
      </Typography>

      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        <Stack direction="row" spacing={1.5} sx={{ p: 2, alignItems: 'center' }}>
          <LocationOnIcon color="secondary" />
          <Typography variant="h6" component="p" sx={{ flexGrow: 1, fontWeight: 600, overflowWrap: 'anywhere' }}>
            {ADDRESS}
          </Typography>
          <Tooltip title={copied ? 'Copied!' : 'Copy address'}>
            <IconButton aria-label="Copy address" onClick={copyAddress} color={copied ? 'success' : 'default'}>
              {copied ? <CheckIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        <Box
          component="iframe"
          title={`Map of ${ADDRESS}`}
          src={MAP_EMBED_URL}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          // Sized to the viewport so the title, address and map fit on one screen on desktop.
          sx={{ display: 'block', width: '100%', height: { xs: '65vh', md: '70vh' }, minHeight: 400, border: 0 }}
        />
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={(_event, reason) => reason !== 'clickaway' && setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  )
}
