import { useMemo, useState } from 'react'
import { Link as RouterLink, useNavigate, useOutletContext } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteItemDialog from '../components/DeleteItemDialog'
import ItemCard from '../components/ItemCard'
import ItemsLoadState from '../components/ItemsLoadState'
import SearchField from '../components/SearchField'
import SortMenu from '../components/SortMenu'
import { useItems } from '../context/useItems'
import { useDebouncedQuery } from '../hooks/useDebouncedQuery'
import { searchByTitle } from '../utils/searchItems'
import { sortItems } from '../utils/sortItems'

const editItemPath =(id) => `/admin/edit/${encodeURIComponent(id)}`

export default function AdminPage() {
  const { items, status } = useItems()
  const { query, setQuery, sort, setSort } = useOutletContext()
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const searchQuery = useDebouncedQuery(query)
  const visibleItems = useMemo(() => searchByTitle(sortItems(items, sort), searchQuery), [items, sort, searchQuery])

  const askToDelete = (item) => {
    setDeleteTarget(item)
    setDeleteOpen(true)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Manage items
          </Typography>
          {status === 'ready' && (
            <Typography color="text.secondary">
              {items.length} {items.length === 1 ? 'item' : 'items'} for sale
            </Typography>
          )}
        </Box>
        <Button component={RouterLink} to="/admin/new" variant="contained" size="large" startIcon={<AddIcon />}>
          Add Item
        </Button>
      </Stack>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <SearchField value={query} onChange={setQuery} sx={{ flexGrow: 1, minWidth: 250, maxWidth: { sm: 360 } }} />
        <SortMenu value={sort} onChange={setSort} />
      </Box>

      <ItemsLoadState />
      {status === 'ready' && items.length === 0 && (
        <Typography variant="h6" sx={{ py: 8, textAlign: 'center' }}>
          No items yet. Use “Add Item” to put the first one up for sale.
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
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {visibleItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onOpen={() => navigate(editItemPath(item.id))}
            openLabel={`Edit ${item.title}`}
            actions={
              <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                <Button
                  component={RouterLink}
                  to={editItemPath(item.id)}
                  variant="outlined"
                  color="secondary"
                  startIcon={<EditOutlinedIcon />}
                  sx={{ flex: 1 }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => askToDelete(item)}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlinedIcon />}
                  sx={{ flex: 1 }}
                >
                  Delete
                </Button>
              </Stack>
            }
          />
        ))}
      </Box>

      <DeleteItemDialog item={deleteTarget} open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </Container>
  )
}
