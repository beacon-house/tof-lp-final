export function shouldLog(): boolean {
  return import.meta.env.VITE_ENVIRONMENT === 'stg'
}
