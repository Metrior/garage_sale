import { useMemo, useState } from 'react'
import { Link as RouterLink, useOutletContext } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteItemDialog from '../components/DeleteItemDialog'
import type { GalleryState } from '../components/GalleryRoute'
import ItemCard from '../components/ItemCard'
import ItemDialog from '../components/ItemDialog'
import ItemsLoadState from '../components/ItemsLoadState'
import SearchField from '../components/SearchField'
import SortMenu from '../components/SortMenu'
import { useAuth } from '../context/useAuth'
import { useItems } from '../context/useItems'
import { useDebouncedQuery } from '../hooks/useDebouncedQuery'
import type { Item } from '../types'
import { searchByTitle } from '../utils/searchItems'
import { sortItems } from '../utils/sortItems'

// Shown on each card instead of "Add to cart" while the admin is logged in.
function AdminActions({ item, onDelete }: { item: Item; onDelete: (item: Item) => void }) {
  return (
    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
      <Button
        component={RouterLink}
        to={`/edit/${encodeURIComponent(item.id)}`}
        variant="outlined"
        color="secondary"
        startIcon={<EditOutlinedIcon />}
        sx={{ flex: 1 }}
      >
        Edit
      </Button>
      <Button
        onClick={() => onDelete(item)}
        variant="outlined"
        color="error"
        startIcon={<DeleteOutlinedIcon />}
        sx={{ flex: 1 }}
      >
        Delete
      </Button>
    </Stack>
  )
}

export default function GalleryPage() {
  const { items, status } = useItems()
  const { isAdmin } = useAuth()
  const { query, setQuery, sort, setSort } = useOutletContext<GalleryState>()
  const [dialogItem, setDialogItem] = useState<Item | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const searchQuery = useDebouncedQuery(query)
  const visibleItems = useMemo(() => searchByTitle(sortItems(items, sort), searchQuery), [items, sort, searchQuery])

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
          <Typography variant="h6">Nothing found for “{searchQuery.trim()}”</Typography>
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
          <ItemCard
            key={item.id}
            item={item}
            onOpen={() => openItem(item)}
            actions={isAdmin ? <AdminActions item={item} onDelete={askToDelete} /> : undefined}
          />
        ))}
      </Box>
      <ItemDialog item={dialogItem} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <DeleteItemDialog item={deleteTarget} open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </Container>
  )
}
