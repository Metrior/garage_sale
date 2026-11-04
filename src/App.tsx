import { HashRouter, Navigate, Route, Routes } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AuthProvider } from './context/auth'
import { CartProvider } from './context/cart'
import { ItemsProvider } from './context/items'
import AdminRoute from './components/AdminRoute'
import GalleryRoute from './components/GalleryRoute'
import Header from './components/Header'
import GalleryPage from './pages/GalleryPage'
import ItemFormPage from './pages/ItemFormPage'
import CartPage from './pages/CartPage'
import LocationPage from './pages/LocationPage'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#f3d27a', dark: '#e6bf55', contrastText: '#4a3f24' },
    secondary: { main: '#b5832a', contrastText: '#ffffff' },
    background: { default: '#fffbef', paper: '#fffef9' },
    text: { primary: '#3f3726', secondary: '#7a6e55' },
  },
  shape: { borderRadius: 10 },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ItemsProvider>
          <CartProvider>
            <HashRouter>
              <Header />
              <Routes>
                <Route element={<GalleryRoute />}>
                  <Route path="/" element={<GalleryPage />} />
                  <Route element={<AdminRoute />}>
                    <Route path="/new" element={<ItemFormPage />} />
                    <Route path="/edit/:id" element={<ItemFormPage />} />
                  </Route>
                </Route>
                <Route path="/location" element={<LocationPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </HashRouter>
          </CartProvider>
        </ItemsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
