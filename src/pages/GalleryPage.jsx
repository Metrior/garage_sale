import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import items from '../data/items.json'
import ItemCard from '../components/ItemCard'
import ItemDialog from '../components/ItemDialog'
import SearchField from '../components/SearchField'
import SortMenu from '../components/SortMenu'
import { searchByTitle } from '../utils/searchItems'
import { DEFAULT_SORT, sortItems } from '../utils/sortItems'

export default function GalleryPage() {
  const [sort, setSort] = useState(DEFAULT_SORT)
  const [query, setQuery] = useState('')
  const [dialogItem, setDialogItem] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const visibleItems = useMemo(() => searchByTitle(sortItems(items, sort), query), [sort, query])

  const openItem = (item) => {
    setDialogItem(item)
    setDialogOpen(true)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Items for sale
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
          <SearchField value={query} onChange={setQuery} sx={{ flexGrow: 1, minWidth: 0, width: { sm: 260 } }} />
          <SortMenu value={sort} onChange={setSort} />
        </Stack>
      </Stack>

      {visibleItems.length === 0 && (
        <Stack spacing={2} sx={{ alignItems: 'center', py: 8, textAlign: 'center' }}>
          <Typography variant="h6">Nothing found for “{query.trim()}”</Typography>
          <Button variant="contained" onClick={() => setQuery('')}>
            Clear search
          </Button>
        </Stack>
      )}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        }}
      >
        {visibleItems.map((item) => (
          <ItemCard key={item.id} item={item} onOpen={() => openItem(item)} />
        ))}
      </Box>
      <ItemDialog item={dialogItem} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Container>
  )
}
