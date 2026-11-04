import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SortIcon from '@mui/icons-material/Sort'
import type { SortValue } from '../../types'
import { SORT_OPTIONS } from '../../utils/sortItems'

export default function SortMenu({ value, onChange }: { value: SortValue; onChange: (value: SortValue) => void }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const current = SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[0]

  const close = () => setAnchorEl(null)

  return (
    <>
      <Button
        id="sort-button"
        variant="outlined"
        color="secondary"
        startIcon={<SortIcon />}
        aria-label={`Sort by ${current.label}`}
        aria-haspopup="menu"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ textTransform: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
      >
        {current.label}
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ list: { 'aria-labelledby': 'sort-button' } }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => {
              onChange(option.value)
              close()
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
