import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { AuthContext } from './AuthContext'

// Same check as the database rules in supabase/migrations: the role lives in app_metadata,
// which users can't change themselves.
const isAdminUser = (user) => user?.app_metadata?.role === 'admin'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fires right away with the saved session (if any), then on every login, logout and token refresh.
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setLoading(false)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (!isAdminUser(data.user)) {
      await supabase.auth.signOut()
      throw new Error("This account doesn't have admin access.")
    }
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Logout failed', error)
  }, [])

  const value = useMemo(
    () => ({ loading, user: session?.user ?? null, isAdmin: isAdminUser(session?.user), signIn, signOut }),
    [loading, session, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
