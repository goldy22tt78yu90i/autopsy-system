import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface Notification {
  id: string
  severity: 'high' | 'medium' | 'low'
  title: string
  description: string
  time: string
  camera?: string
  read: boolean
  dismissed: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  dismissNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const initialNotifications: Notification[] = [
  {
    id: '1',
    severity: 'high',
    title: 'Intruder Detected - Sector 4',
    description: 'Unauthorized access detected in North-West loading dock',
    time: '02:14:55 AM',
    camera: 'CAM-04',
    read: false,
    dismissed: false,
  },
  {
    id: '2',
    severity: 'medium',
    title: 'Thermal Spike - Server Rack 2',
    description: 'Temperature exceeding threshold (+12°C)',
    time: '02:08:12 AM',
    camera: 'THERMAL-09',
    read: false,
    dismissed: false,
  },
  {
    id: '3',
    severity: 'medium',
    title: 'Unrecognized Vehicle',
    description: 'Vehicle lingering in Perimeter Zone C for >5 mins',
    time: '01:55:00 AM',
    camera: 'CAM-01',
    read: false,
    dismissed: false,
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unreadCount = notifications.filter(n => !n.read && !n.dismissed).length

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, dismissed: true, read: true } : n)
    )
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, dismissNotification, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
