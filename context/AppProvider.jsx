import { UIProvider } from './ui'
import { NotesProvider } from './notes'

/**
 * AppProvider
 *
 * Composes every context provider into a single wrapper.
 * Wrap your root layout with this once — all child components
 * then access state via `useUI()` or `useNotes()`.
 *
 * To add a new domain (tags, settings, etc.) later, create a
 * new `context/<domain>.jsx` and nest its provider here.
 */

export const AppProvider = ({ children }) => (
  <UIProvider>
    <NotesProvider>
      {children}
    </NotesProvider>
  </UIProvider>
)
