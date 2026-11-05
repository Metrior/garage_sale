import { useMemo, useState } from 'react'
import { Link as RouterLink, useOutletContext } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import DeleteItemDialog from '../../components/DeleteItemDialog'
import ItemAdminActions from '../../components/ItemAdminActions'
import ItemCard from '../../components/ItemCard'
import ItemDialog from '../../components/ItemDialog'
import ItemsLoadState from '../../components/ItemsLoadState'
import SearchField from '../../components/SearchField'
import SortMenu from '../../components/SortMenu'
import { useAuth } from '../../context/auth'
import { useItems } from '../../context/items'
import { useDebouncedQuery } from '../../hooks/useDebouncedQuery'
import type { GalleryState, Item } from '../../types'
import { searchByTitle } from '../../utils/searchItems'
import { sortItems } from '../../utils/sortItems'

export default function GalleryPage() {
  const { items, status } = useItems()
  const { isAdmin } = useAuth()
  const { query, setQuery, sort, setSort, bookedOnly, setBookedOnly } = useOutletContext<GalleryState>()
  const [dialogItem, setDialogItem] = useState<Item | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const searchQuery = useDebouncedQuery(query)
  // The filter stays set if the admin logs out, but only applies while they're logged in.
  const showBookedOnly = isAdmin && bookedOnly
  const visibleItems = useMemo(() => {
    const found = searchByTitle(sortItems(items, sort), searchQuery)
    return showBookedOnly ? found.filter((item) => item.booked_by) : found
  }, [items, sort, searchQuery, showBookedOnly])
  const trimmedQuery = searchQuery.trim()

  const openItem = (item: Item) => {
    setDialogItem(item)
    setDialogOpen(true)
  }
  const askToDelete = (item: Item) => {
    setDeleteTarget(item)
    setDeleteOpen(true)
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
        <Stack spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          {isAdmin && (
            <Button
              component={RouterLink}
              to="/new"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ alignSelf: 'flex-end' }}
            >
              Add Item
            </Button>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
            <SearchField value={query} onChange={setQuery} sx={{ flexGrow: 1, minWidth: 250, width: { sm: 260 } }} />
            <SortMenu value={sort} onChange={setSort} />
            {isAdmin && (
              <Chip
                label="Booked"
                color="booked"
                variant={bookedOnly ? 'filled' : 'outlined'}
                icon={bookedOnly ? <CheckIcon /> : undefined}
                onClick={() => setBookedOnly(!bookedOnly)}
                aria-pressed={bookedOnly}
              />
            )}
          </Box>
        </Stack>
      </Stack>

      <ItemsLoadState />
      {status === 'ready' && items.length === 0 && (
        <Typography variant="h6" sx={{ py: 8, textAlign: 'center' }}>
          {isAdmin
            ? 'No items yet. Use “Add Item” to put the first one up for sale.'
            : 'Nothing for sale right now. Check back soon!'}
        </Typography>
      )}
      {status === 'ready' && items.length > 0 && visibleItems.length === 0 && (
        <Stack spacing={2} sx={{ alignItems: 'center', py: 8, textAlign: 'center' }}>
          <Typography variant="h6">
            {!trimmedQuery
              ? 'No booked items'
              : showBookedOnly
                ? `No booked items match “${trimmedQuery}”`
                : `Nothing found for “${trimmedQuery}”`}
          </Typography>
          <Stack direction="row" spacing={2}>
            {trimmedQuery && (
              <Button variant="contained" onClick={() => setQuery('')}>
                Clear search
              </Button>
            )}
            {showBookedOnly && (
              <Button variant={trimmedQuery ? 'outlined' : 'contained'} color="secondary" onClick={() => setBookedOnly(false)}>
                Show all items
              </Button>
            )}
          </Stack>
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
          <ItemCard
            key={item.id}
            item={item}
            onOpen={() => openItem(item)}
            actions={isAdmin ? <ItemAdminActions item={item} onDelete={askToDelete} /> : undefined}
          />
        ))}
      </Box>
      <ItemDialog item={dialogItem} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <DeleteItemDialog item={deleteTarget} open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </Container>
  )
}
