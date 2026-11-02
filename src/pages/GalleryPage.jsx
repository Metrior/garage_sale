import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import items from '../data/items.json'
import ItemCard from '../components/ItemCard'

export default function GalleryPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Items for sale
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        }}
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Box>
    </Container>
  )
}
