import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Activity, FileText, Video, User, AlertTriangle, Eye, X, Clock, MapPin } from 'lucide-react'

const alertCards = [
  {
    severity: 'high' as const,
    time: '02:14:55 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxyzUHffnK5Rr0sLHXY26fV9c4YDXGGHeaxetXE9m9z0882UV1rxiykD3vXDwWh7L9dQwiRJX-MDFFu8BzIB8qMcvQ3z1u2zm-bswgGcz-kUpqQM7HKrLui5Vp3Hf41a39Ydrm2LJX1qkwhE4ZQATLSCpCDSBgqumVvWYRlX-gi15ST_5C7rO7uUsbrqCskZ8CQkC0AnK8D6JWxzowZVl4WN3LAXI47JDAtw4CLZ424wMIkWc4CQDC5gYtwzFbZX65x5gZwtHJTGo',
    camera: 'CAM-04',
    title: 'Intruder Detected - Sector 4',
    description: 'Unauthorized access detected in North-West loading dock. Facial recognition match: NULL.',
    actions: ['View Live', 'Dismiss'],
  },
  {
    severity: 'medium' as const,
    time: '02:08:12 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8xhzicb8VG584K6l6xpeGL0Hp9iu-z3ORXh0aWJLnv0uaHlsj29JC_K8SUT5O-AkB2SUUNik34QN5ZSe6ySOniczZ_qOt31YqIGvWJEuUf7uuSxUnkYXBF54TviRMhXY93U_AapVX0Lcv6QQ5KZ7em_07xShC600w2qlnZtMgxOC8Q3YJOHSgIGsfra3n_7o5AcbTUT-BM6vL0A0NVWH3fw5_syl7OxLVB2d8zPYS2SkM0ZcOJCLXTBoW6N1UL9goiO5L33aKGc',
    camera: 'THERMAL-09',
    title: 'Thermal Spike - Server Rack 2',
    description: 'Temperature exceeding threshold (+12°C). Cooling failure suspected in Unit B.',
    actions: ['Investigate', 'Log'],
  },
  {
    severity: 'medium' as const,
    time: '01:55:00 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmF2Ge4d8UXHV7DNa-R_p4_DnlHTBYka9BYxW6kiwWj-pMYwy2rC0CkA_txQczppSNdcOeVb1EZKMSnyiWQSwvika4-Bu42ZlXXgVxAchcafx_Ua03yrMRw7u7ouOl37JaOkfgNhLe-jDfULZxiL3p8ZZZ0ThGMuJSxLMOZisOrLrR4Dobafk-pNMe_gXSJjiVnAOxT5sGRd7dFwIrwW68yfGfrF5r870M_mnE91cumVPQkWwqnKTpoIxTH8EUWhN-xW3QlkXhJ1M',
    camera: 'CAM-01',
    title: 'Unrecognized Vehicle',
    description: 'Vehicle lingering in Perimeter Zone C for >5 mins. Plate: OV-772X.',
    actions: ['View Live', 'Ignore'],
  },
]

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

export default function Alerts() {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set())

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
              <p className="font-mono-data text-on-surface-muted text-sm">Priority Queue :: {alertCards.length - dismissed.size} active threats</p>
            </div>
          </div>
          <div className="hidden md:block font-mono-data text-xs text-on-surface-muted/40">
            LAT: 40.7128° N | LON: 74.0060° W
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alertCards.map((alert, i) => {
            if (dismissed.has(i)) return null
            return (
              <div key={i} className={`glass-card relative overflow-hidden rounded-xl severity-${alert.severity}`}>
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
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      src={alert.image}
                      alt={alert.title}
                    />
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
                    <button className="flex-1 btn-primary text-[10px] py-2">
                      <Eye size={12} />
                      {alert.actions[0]}
                    </button>
                    <button
                      onClick={() => setDismissed((prev) => new Set([...prev, i]))}
                      className="flex-1 btn-secondary text-[10px] py-2"
                    >
                      <X size={12} />
                      {alert.actions[1]}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
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
