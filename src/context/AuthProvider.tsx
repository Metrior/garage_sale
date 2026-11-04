import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { AuthContext, type AuthContextValue } from './AuthContext'

// Same check as the database rules in supabase/migrations: the role lives in app_metadata,
// which users can't change themselves.
const isAdminUser = (user: User | null | undefined): boolean => user?.app_metadata?.role === 'admin'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fires right away with the saved session (if any), then on every login, logout and token refresh.
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setLoading(false)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
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

  const value = useMemo<AuthContextValue>(
    () => ({ loading, user: session?.user ?? null, isAdmin: isAdminUser(session?.user), signIn, signOut }),
    [loading, session, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
