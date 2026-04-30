import { useNotifications } from '../context/NotificationContext'
import { useToast } from '../context/ToastContext'
import AppLayout from '../components/AppLayout'
import { AlertTriangle, Eye, X, Clock, MapPin, Activity, FileText, Video, User } from 'lucide-react'

export default function Alerts() {
  const { notifications, dismissNotification, markAsRead } = useNotifications()
  const { showToast } = useToast()

  const activeAlerts = notifications.filter(n => !n.dismissed)

  const handleViewLive = (alert: typeof notifications[0]) => {
    markAsRead(alert.id)
    showToast(`Viewing live feed for ${alert.title}`, 'info')
  }

  const timelineItems = [
    {
      type: 'info' as const,
      time: '01:42:15 AM',
      title: 'System Diagnostic Complete',
      description: 'All perimeter sensors reporting status: GREEN. Encryption keys rotated.',
      actionLabel: 'View Log',
      icon: <FileText size={14} />,
      borderColor: 'border-primary-light',
      dotColor: 'bg-primary-light',
      textColor: 'text-primary-light',
    },
    {
      type: 'warning' as const,
      time: '01:20:04 AM',
      title: 'Power Fluctuations - Zone 2',
      description: 'Voltage drop detected in auxiliary power supply. Switching to backup array.',
      actionLabel: 'Review Clip',
      icon: <Video size={14} />,
      borderColor: 'border-tertiary',
      dotColor: 'bg-tertiary',
      textColor: 'text-tertiary',
    },
    {
      type: 'info' as const,
      time: '12:58:33 AM',
      title: 'Authorized Entry - Employee 884',
      description: 'Access granted to Lab 7. ID verification: Biometric Match Verified.',
      actionLabel: 'Profile',
      icon: <User size={14} />,
      borderColor: 'border-primary-light',
      dotColor: 'bg-primary-light',
      textColor: 'text-primary-light',
    },
    {
      type: 'critical' as const,
      time: '12:15:10 AM',
      title: 'Fire Suppression Activated',
      description: 'Smoke detected in Waste Management. Suppression system deployed automatically.',
      actionLabel: 'Report',
      icon: <AlertTriangle size={14} />,
      borderColor: 'border-error',
      dotColor: 'bg-error',
      textColor: 'text-error',
    },
  ]

  return (
    <AppLayout>
      {/* Active Alerts Section */}
      <section className="space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-error/10 rounded-lg">
              <AlertTriangle className="text-error" size={20} />
            </div>
            <div>
              <h2 className="font-headline-lg text-on-background">Active Alerts</h2>
              <p className="font-mono-data text-on-surface-muted text-sm">Priority Queue :: {activeAlerts.length} active threats</p>
            </div>
          </div>
          <div className="hidden md:block font-mono-data text-xs text-on-surface-muted/40">
            LAT: 40.7128° N | LON: 74.0060° W
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className={`glass-card relative overflow-hidden rounded-xl severity-${alert.severity}`}>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 font-label-caps text-[10px] tracking-[0.2em] rounded ${alert.severity === 'high' ? 'bg-error/20 text-error' : 'bg-error-medium/20 text-error-medium'}`}>
                    {alert.severity === 'high' ? 'CRITICAL' : 'WARNING'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-on-surface-muted" />
                    <span className="font-mono-data text-xs text-on-surface-muted">{alert.time}</span>
                  </div>
                </div>

                <div className="mb-4 aspect-video relative overflow-hidden rounded-lg bg-surface-container-highest">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <AlertTriangle className="text-error/50" size={48} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <MapPin size={10} className="text-primary-light" />
                    <span className="text-[8px] font-mono-data text-white/80 uppercase">{alert.camera}</span>
                  </div>
                  {alert.severity === 'high' && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-error rounded-full animate-pulse"></div>
                      <span className="text-[8px] font-mono-data text-error uppercase">Live</span>
                    </div>
                  )}
                </div>

                <h3 className="font-headline-md text-on-background mb-2">{alert.title}</h3>
                <p className="text-sm text-on-surface-muted mb-6">{alert.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewLive(alert)}
                      className="flex-1 btn-primary text-[10px] py-2"
                    >
                      <Eye size={12} />
                      View Live
                    </button>
                  <button
                    onClick={() => dismissNotification(alert.id)}
                    className="flex-1 btn-secondary text-[10px] py-2"
                  >
                    <X size={12} />
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Timeline Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary-light/10 rounded-lg">
            <Activity className="text-primary-light" size={20} />
          </div>
          <h2 className="font-headline-md text-on-background">Event Timeline</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary-light/30 to-transparent"></div>
        </div>

        <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary-light/50 before:via-outline-variant before:to-transparent">
          {timelineItems.map((item, i) => (
            <div key={i} className="relative">
              <div className={`absolute -left-10 top-1 w-6 h-6 rounded-full bg-surface border-2 ${item.borderColor} flex items-center justify-center z-10`}>
                <div className={`w-2 h-2 ${item.dotColor} rounded-full`}></div>
              </div>
              <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-start hover:border-primary-light/30 transition-all">
                <div className={`w-full md:w-32 font-mono-data text-sm font-bold ${item.textColor}`}>{item.time}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[8px] font-label-caps px-1.5 py-0.5 rounded ${item.type === 'critical' ? 'bg-error/20 text-error' : item.type === 'warning' ? 'bg-error-medium/20 text-error-medium' : 'bg-primary-light/20 text-primary-light'}`}>
                      {item.type}
                    </span>
                    <h4 className="font-body-lg text-sm font-bold text-on-background">{item.title}</h4>
                  </div>
                  <p className="text-xs text-on-surface-muted">{item.description}</p>
                </div>
                <div className="w-full md:w-auto">
                  <button className="text-primary-light text-[10px] font-label-caps flex items-center gap-1 hover:underline">
                    {item.icon} {item.actionLabel}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}
