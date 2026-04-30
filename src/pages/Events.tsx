import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Filter, Clock, Tag, Eye, Flag, Share, AlertTriangle, Shield } from 'lucide-react'

interface Event {
  id: string
  time: string
  date: string
  objectLabel: string
  severity: 'high' | 'medium' | 'low'
  description: string
  camera: string
  confidence: number
  thumbnail: string
  duration?: string
}

const mockEvents: Event[] = [
  {
    id: '1',
    time: '02:14:55 AM',
    date: '2024-04-27',
    objectLabel: 'Intruder Detected',
    severity: 'high',
    description: 'Unauthorized access detected in North-West loading dock. Facial recognition match: NULL.',
    camera: 'CAM-04',
    confidence: 95,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxyzUHffnK5Rr0sLHXY26fV9c4YDXGGHeaxetXE9m9z0882UV1rxiykD3vXDwWh7L9dQwiRJX-MDFFu8BzIB8qMcvQ3z1u2zm-bswgGcz-kUpqQM7HKrLui5Vp3Hf41a39Ydrm2LJX1qkwhE4ZQATLSCpCDSBgqumVvWYRlX-gi15ST_5C7rO7uUsbrqCskZ8CQkC0AnK8D6JWxzowZVl4WN3LAXI47JDAtw4CLZ424wMIkWc4CQDC5gYtwzFbZX65x5gZwtHJTGo',
  },
  {
    id: '2',
    time: '02:08:12 AM',
    date: '2024-04-27',
    objectLabel: 'Thermal Spike',
    severity: 'medium',
    description: 'Temperature exceeding threshold (+12°C). Cooling failure suspected in Server Rack 2.',
    camera: 'THERMAL-09',
    confidence: 88,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8xhzicb8VG584K6l6xpeGL0Hp9iu-z3ORXh0aWJLnv0uaHlsj29JC_K8SUT5O-AkB2SUUNik34QN5ZSe6ySOniczZ_qOt31YqIGvWJEuUf7uuSxUnkYXBF54TviRMhXY93U_AapVX0Lcv6QQ5KZ7em_07xShC600w2qlnZtMgxOC8Q3YJOHSgIGsfra3n_7o5AcbTUT-BM6vL0A0NVWH3fw5_syl7OxLVB2d8zPYS2SkM0ZcOJCLXTBoW6N1UL9goiO5L33aKGc',
  },
  {
    id: '3',
    time: '01:55:00 AM',
    date: '2024-04-27',
    objectLabel: 'Unrecognized Vehicle',
    severity: 'medium',
    description: 'Vehicle lingering in Perimeter Zone C for >5 mins. Plate: OV-772X.',
    camera: 'CAM-01',
    confidence: 92,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmF2Ge4d8UXHV7DNa-R_p4_DnlHTBYka9BYxW6kiwWj-pMYwy2rC0CkA_txQczppSNdcOeVb1EZKMSnyiWQSwvika4-Bu42ZlXXgVxAchcafx_Ua03yrMRw7u7ouOl37JaOkfgNhLe-jDfULZxiL3p8ZZZ0ThGMuJSxLMOZisOrLrR4Dobafk-pNMe_gXSJjiVnAOxT5sGRd7dFwIrwW68yfGfrF5r870M_mnE91cumVPQkWwqnKTpoIxTH8EUWhN-xW3QlkXhJ1M',
    duration: '5m 12s'
  },
  {
    id: '4',
    time: '01:42:15 AM',
    date: '2024-04-27',
    objectLabel: 'System Diagnostic',
    severity: 'low',
    description: 'All perimeter sensors reporting status: GREEN. Encryption keys rotated successfully.',
    camera: 'SYSTEM',
    confidence: 100,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsjPv0CBhPXJKq6AD4C-QZpSc0XrBbTUUbFLXa0rONSu_i9p2xgnUm2zs4jmEWa8wWuvr5fCIncEzc6iXEiLXsjCbIUwo9ie0GH8krqBoWVePPlbBvTgBm0OGAyeyMBqIpY85cqVUN7szf9-F1QWbWCC_0A37uLekYQ_KNQAHAx8oHxVYX0G-frMW4aVFeYxxsJxt_mmaERnyuIbDA5b0N-Qh1PalFqNji8L-baLCWkRB-Qn3OZttai0LMCiPjvQuhohoLkeOvJ3c',
  },
  {
    id: '5',
    time: '01:20:04 AM',
    date: '2024-04-27',
    objectLabel: 'Power Fluctuation',
    severity: 'low',
    description: 'Voltage drop detected in auxiliary power supply. Switching to backup array.',
    camera: 'CAM-07',
    confidence: 96,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwxprmhrRV9jYMgiGvVGDfcOxj7AiSjzcR1IH__9jullMNdGN5CgSPMU_djfaPT67SJQCbgGfMgROimbnm5aIZC2RGyM5kKPxR9yZ3ytuthY2QuZgKNzvS55OqJftZvWJULUQCv4_U6Rmrf9wHoMFoqnvnioMW8IYLXI-lRflU-2Bj_Mo5bO-dYkntfuNQmt2D2aEiSjyHSLgGaVyHCpttUIdHdBBZN0qJJiheF3Q8Dk1iuSHz6W-fo-5-vnfOWxOMGpjdPLHO1uc',
  },
]

export default function Events() {
  const [severityFilter, setSeverityFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('24h')
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline')

  const filteredEvents = mockEvents.filter(event => {
    if (severityFilter !== 'all' && event.severity !== severityFilter) return false
    return true
  })

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <span className="badge-high px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">High</span>
      case 'medium': return <span className="badge-medium px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Medium</span>
      case 'low': return <span className="badge-low px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Low</span>
      default: return null
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle size={16} className="text-error" />
      case 'medium': return <AlertTriangle size={16} className="text-error-medium" />
      case 'low': return <Shield size={16} className="text-error-low" />
      default: return null
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-headline-lg text-on-background mb-1">Event Intelligence Hub</h2>
            <p className="text-on-surface-muted text-body-md">Timeline-based event monitoring and analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-2 rounded-lg text-xs font-mono-data transition-all ${viewMode === 'timeline' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-muted hover:text-on-background'}`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg text-xs font-mono-data transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-muted hover:text-on-background'}`}
            >
              Grid
            </button>
          </div>
        </div>

          {/* Filters */}
          <div className="glass-card p-4 rounded-xl">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-xs font-mono-data text-on-surface-muted uppercase tracking-widest flex items-center gap-1">
                  <Filter size={12} /> Severity:
                </span>
                {['all', 'high', 'medium', 'low'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSeverityFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${severityFilter === f ? 'bg-primary-light text-white' : 'bg-surface-container text-on-surface-muted hover:text-on-background'}`}
                  >
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-xs font-mono-data text-on-surface-muted uppercase tracking-widest">Time:</span>
                {['1h', '24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${timeRange === range ? 'bg-primary-light text-white' : 'bg-surface-container text-on-surface-muted hover:text-on-background'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Count */}
        <div className="flex items-center gap-3">
          <h3 className="font-headline-md text-on-background">Events</h3>
          <span className="font-mono-data text-sm text-on-surface-muted">({filteredEvents.length} found)</span>
        </div>

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="relative pl-8 space-y-4 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary-light before:via-outline-variant before:to-transparent">
            {filteredEvents.map((event) => (
              <div key={event.id} className="relative">
                <div className={`absolute -left-8 top-1 w-6 h-6 rounded-full bg-surface border-2 ${event.severity === 'high' ? 'border-error' : event.severity === 'medium' ? 'border-error-medium' : 'border-error-low'} flex items-center justify-center z-10`}>
                  <div className={`w-2 h-2 rounded-full ${event.severity === 'high' ? 'bg-error' : event.severity === 'medium' ? 'bg-error-medium' : 'bg-error-low'}`}></div>
                </div>
                <div className="glass-card rounded-xl p-4 hover:border-primary-light/30 transition-all group">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-48 flex-shrink-0">
                      <div className="aspect-video rounded-lg overflow-hidden bg-surface-container-highest relative">
                        <img src={event.thumbnail} alt={event.objectLabel} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] font-mono-data text-white">
                            {event.camera}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(event.severity)}
                          <h4 className="font-label-bold text-on-background">{event.objectLabel}</h4>
                        </div>
                        {getSeverityBadge(event.severity)}
                      </div>
                      <p className="text-sm text-on-surface-muted mb-3">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs font-mono-data text-on-surface-muted">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag size={12} />
                          {event.confidence}%
                        </span>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <button className="p-2 bg-surface-container hover:bg-primary/20 hover:text-primary-light rounded-lg transition-all" title="View Clip">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 bg-surface-container hover:bg-error/20 hover:text-error rounded-lg transition-all" title="Flag">
                        <Flag size={16} />
                      </button>
                      <button className="p-2 bg-surface-container hover:bg-tertiary/20 hover:text-tertiary rounded-lg transition-all" title="Share">
                        <Share size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="glass-card rounded-xl overflow-hidden group">
                <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                  <img src={event.thumbnail} alt={event.objectLabel} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[8px] font-mono-data text-white">
                      {event.camera}
                    </span>
                    {getSeverityBadge(event.severity)}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-white/80 text-xs font-mono-data">
                      <Clock size={12} />
                      {event.time}
                    </span>
                    <span className={`text-xs font-mono-data font-bold ${event.severity === 'high' ? 'text-error' : event.severity === 'medium' ? 'text-error-medium' : 'text-error-low'}`}>
                      {event.confidence}%
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-label-bold text-on-background mb-2">{event.objectLabel}</h4>
                  <p className="text-xs text-on-surface-muted mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 btn-secondary text-xs py-1.5 justify-center">
                      <Eye size={12} /> View
                    </button>
                    <button className="p-1.5 bg-surface-container hover:bg-error/20 hover:text-error rounded-lg transition-all">
                      <Flag size={14} />
                    </button>
                    <button className="p-1.5 bg-surface-container hover:bg-tertiary/20 hover:text-tertiary rounded-lg transition-all">
                      <Share size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
