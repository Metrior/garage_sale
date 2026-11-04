// The message to show for a caught error. Supabase errors aren't always `Error` instances,
// so any object with a non-empty `message` counts.
export function errorMessage(error: unknown, fallback: string): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const { message } = error
    if (typeof message === 'string' && message) return message
  }
  return fallback
}
