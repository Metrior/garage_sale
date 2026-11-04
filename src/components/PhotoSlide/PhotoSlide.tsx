import { useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// One photo of PhotoCarousel, with a spinner until it has loaded.
export default function PhotoSlide({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Box
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      sx={{ position: 'relative', flex: '0 0 100%', height: '100%', scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
    >
      {!loaded && (
        <CircularProgress
          aria-label="Loading photo"
          sx={{ position: 'absolute', top: '50%', left: '50%', mt: -2.5, ml: -2.5, color: 'grey.500' }}
        />
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none' }}
      />
    </Box>
  )
}
