import { createContext, useContext, useState, useCallback, useMemo } from 'react'

/**
 * Notifications Context
 *
 * Central store for all in-app notifications, errors, and messages.
 * Components push messages here; MessageSpacer reads and renders them.
 *
 * Each notification:
 *   { id, type, title, body, timestamp, read, action? }
 *
 * Types: 'error' | 'alert' (high-priority) or omitted (normal)
 */

const NotificationsContext = createContext(null)

let _nextId = 1

/* ── Provider ─────────────────────────────────────────────────── */

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [panelOpen, setPanelOpen] = useState(false)

  /** Add a notification. Returns the new notification's id. */
  const addNotification = useCallback(({ type = 'info', title, body = '', action = null }) => {
    const id = _nextId++
    const notification = {
      id,
      type,
      title,
      body,
      timestamp: Date.now(),
      read: false,
      action,
    }
    setNotifications(prev => [notification, ...prev])
    return id
  }, [])

  /** Mark a single notification as read. */
  const markRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  /** Mark all notifications as read. */
  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  /** Remove a single notification. */
  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  /** Clear all notifications. */
  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  /** Toggle the notification panel open/closed. */
  const togglePanel = useCallback(() => {
    setPanelOpen(prev => !prev)
  }, [])

  const closePanel = useCallback(() => setPanelOpen(false), [])
  const openPanel = useCallback(() => setPanelOpen(true), [])

  /** Count of unread notifications. */
  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications],
  )

  const value = useMemo(() => ({
    notifications,
    panelOpen,
    unreadCount,
    addNotification,
    markRead,
    markAllRead,
    dismissNotification,
    clearAll,
    togglePanel,
    openPanel,
    closePanel,
  }), [
    notifications, panelOpen, unreadCount,
    addNotification, markRead, markAllRead,
    dismissNotification, clearAll, togglePanel, openPanel, closePanel,
  ])

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

/* ── Hook ─────────────────────────────────────────────────────── */

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error('useNotifications must be used within <AppProvider>')
  return ctx
}
