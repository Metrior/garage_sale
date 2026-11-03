import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import { imageUrl } from '../utils/imageUrl'
import CartToggleButton from './CartToggleButton'
import ItemPrice from './ItemPrice'

export default function ItemCard({ item, onOpen }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const photoCount = item.images.length

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={onOpen} aria-label={`View photos of ${item.title}`} sx={{ position: 'relative' }}>
        {!imageLoaded && (
          <Skeleton variant="rectangular" animation="wave" sx={{ position: 'absolute', inset: 0, height: '100%' }} />
        )}
        <CardMedia
          component="img"
          image={imageUrl(item.images[0], 'thumb')}
          alt={item.title}
          loading="lazy"
          // Errors also clear the skeleton so a broken image isn't hidden behind it forever.
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          sx={{ aspectRatio: '1 / 1', objectFit: 'cover', opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        {photoCount > 1 && (
          <Box
            component="span"
            sx={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 4,
              color: 'common.white',
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <PhotoLibraryOutlinedIcon sx={{ fontSize: 16 }} />
            {photoCount}
          </Box>
        )}
      </CardActionArea>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" sx={{ lineHeight: 1.3 }}>
          {item.title}
        </Typography>
        <ItemPrice item={item} sx={{ my: 0.5 }} />
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <CartToggleButton itemId={item.id} fullWidth />
      </CardActions>
    </Card>
  )
}
