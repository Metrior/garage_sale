import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { imageUrl } from '../utils/imageUrl'

// The track is a native horizontal scroller with scroll-snap, so touch swipes and trackpad
// gestures work out of the box. Arrow buttons, dots and the left/right keys scroll it too.
function currentPhoto(track) {
  return Math.round(track.scrollLeft / track.clientWidth)
}

// Browsers clamp scrollTo to the scrollable range, so out-of-range targets stop at the ends.
function scrollToPhoto(track, index) {
  track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
}

function Slide({ src, alt, label }) {
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

const arrowSx = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'common.white',
  bgcolor: 'rgba(0, 0, 0, 0.45)',
  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.65)' },
  '&.Mui-disabled': { color: 'rgba(255, 255, 255, 0.3)', bgcolor: 'rgba(0, 0, 0, 0.2)' },
}

export default function PhotoCarousel({ images, title, sx }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const count = images.length

  useEffect(() => {
    if (count < 2) return undefined

    const handleKeyDown = (event) => {
      const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
      const track = trackRef.current
      if (!step || !track || event.defaultPrevented) return
      event.preventDefault()
      scrollToPhoto(track, currentPhoto(track) + step)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [count])

  const goTo = (target) => scrollToPhoto(trackRef.current, target)

  return (
    <Box
      role="region"
      aria-roledescription="carousel"
      aria-label={`Photos of ${title}`}
      sx={[{ position: 'relative', bgcolor: 'grey.900' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        ref={trackRef}
        onScroll={(event) => setIndex(currentPhoto(event.currentTarget))}
        sx={{
          display: 'flex',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          overscrollBehaviorX: 'contain',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {images.map((src, i) => (
          <Slide
            key={i}
            src={imageUrl(src, 'full')}
            alt={count > 1 ? `${title}, photo ${i + 1}` : title}
            label={`${i + 1} of ${count}`}
          />
        ))}
      </Box>

      {count > 1 && (
        <>
          <IconButton aria-label="Previous photo" disabled={index === 0} onClick={() => goTo(index - 1)} sx={{ ...arrowSx, left: 8 }}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Next photo"
            disabled={index === count - 1}
            onClick={() => goTo(index + 1)}
            sx={{ ...arrowSx, right: 8 }}
          >
            <ChevronRightIcon />
          </IconButton>

          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              px: 0.5,
              borderRadius: 10,
              bgcolor: 'rgba(0, 0, 0, 0.35)',
            }}
          >
            {images.map((_, i) => (
              <Box
                key={i}
                component="button"
                type="button"
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i)}
                sx={{
                  width: 20,
                  height: 20,
                  p: 0,
                  border: 0,
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: 8,
                    height: 8,
                    m: 'auto',
                    borderRadius: '50%',
                    bgcolor: i === index ? 'common.white' : 'rgba(255, 255, 255, 0.45)',
                    transition: 'background-color 0.2s',
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
