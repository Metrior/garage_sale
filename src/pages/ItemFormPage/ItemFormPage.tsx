import { Link as RouterLink, useParams } from 'react-router'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ItemForm from '../../components/ItemForm'
import ItemsLoadState from '../../components/ItemsLoadState'
import { useItems } from '../../context/items'

// /new and /edit/:id
export default function ItemFormPage() {
  const { id } = useParams()
  const { items, status } = useItems()
  const editing = id !== undefined
  const item = editing ? items.find((candidate) => candidate.id === id) : undefined

  let content
  if (!editing) content = <ItemForm key="new" />
  else if (status !== 'ready') content = <ItemsLoadState />
  else if (!item) content = <Alert severity="warning">This item doesn&apos;t exist. It may have been deleted.</Alert>
  else content = <ItemForm key={item.id} item={item} />

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button component={RouterLink} to="/" color="secondary" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back to items
      </Button>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        {editing ? 'Edit item' : 'Add item'}
      </Typography>
      {content}
    </Container>
  )
}
