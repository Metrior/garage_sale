import { useRef } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchField({ value, onChange, sx }) {
  const inputRef = useRef(null)

  // Keep focus in the field after clearing, since the clear button disappears.
  const clear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <TextField
      size="small"
      placeholder="Search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && value) clear()
      }}
      inputRef={inputRef}
      sx={[{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }, ...(Array.isArray(sx) ? sx : [sx])]}
      slotProps={{
        htmlInput: { 'aria-label': 'Search by title', enterKeyHint: 'search' },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton size="small" edge="end" aria-label="Clear search" onClick={clear}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
