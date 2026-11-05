import '@mui/material/styles'
import '@mui/material/Chip'

// Adds the theme's `booked` color (set in App.tsx) so it can be used as <Chip color="booked">.
declare module '@mui/material/styles' {
  interface Palette {
    booked: Palette['primary']
  }
  interface PaletteOptions {
    booked?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    booked: true
  }
}
