import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import {
  AlertTriangle, Video, Lock, Megaphone, Lightbulb, Phone,
  Activity, Clock, Eye, Shield, AlertCircle, Check, X, Info
} from 'lucide-react'

type UserRole = 'admin' | 'operator' | 'viewer'
type ActionType = 'lockdown' | 'sirens' | 'floodlights' | 'dispatch'

interface ActionLog {
  id: string
  user: string
  role: UserRole
  action: ActionType
  location: string
  timestamp: string
  note?: string
}

interface ResponseActionProps {
  icon: React.ReactNode
  label: string
  actionType: ActionType
  userRole: UserRole
  hasContext: boolean
  onConfirm: (action: ActionType) => void
}

const actionPermissions: Record<UserRole, ActionType[]> = {
  admin: ['lockdown', 'sirens', 'floodlights', 'dispatch'],
  operator: ['sirens', 'floodlights', 'dispatch'],
  viewer: []
}

const actionColorMap: Record<ActionType, string> = {
  lockdown: 'text-red-400 border-red-400/30 hover:border-red-400/50',
  sirens: 'text-orange-400 border-orange-400/30 hover:border-orange-400/50',
  floodlights: 'text-blue-400 border-blue-400/30 hover:border-blue-400/50',
  dispatch: 'text-gray-400 border-gray-400/30 hover:border-gray-400/50'
}

function ResponseAction({ icon, label, actionType, userRole, hasContext, onConfirm }: ResponseActionProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const isAllowed = actionPermissions[userRole].includes(actionType)
  const location = 'Sector 4 - Perimeter North'

  if (!isAllowed) {
    return (
      <div className="relative group">
        <button
          disabled
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all text-xs font-mono-data opacity-40 cursor-not-allowed ${actionColorMap[actionType]}`}
        >
          {icon}
          {label.toUpperCase()}
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface-container text-[10px] text-on-surface-muted rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Insufficient permissions
        </div>
      </div>
    )
  }

  if (!hasContext) {
    return (
      <div className="relative group">
        <button
          disabled
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all text-xs font-mono-data opacity-40 cursor-not-allowed ${actionColorMap[actionType]}`}
        >
          {icon}
          {label.toUpperCase()}
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface-container text-[10px] text-on-surface-muted rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Select an event to enable
        </div>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all text-xs font-mono-data bg-surface-container hover:scale-105 ${actionColorMap[actionType]}`}
      >
        {icon}
        {label.toUpperCase()}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirm(false)}></div>
          <div className="relative glass-card rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${actionType === 'lockdown' ? 'bg-red-400/10' : actionType === 'sirens' ? 'bg-orange-400/10' : actionType === 'floodlights' ? 'bg-blue-400/10' : 'bg-gray-400/10'}`}>
                {icon}
              </div>
              <div>
                <h3 className="font-headline-md text-on-background">{label.toUpperCase()}</h3>
                <p className="text-xs text-on-surface-muted">{location}</p>
              </div>
            </div>

            <div className={`p-3 rounded-lg mb-4 ${actionType === 'lockdown' ? 'bg-red-400/10 border border-red-400/20' : 'bg-primary/10 border border-primary/20'}`}>
              <p className="text-xs text-on-surface-muted">
                <AlertCircle size={12} className="inline mr-1" />
                This action will trigger a real-world response
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onConfirm(actionType)
                  setShowConfirm(false)
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-mono-data font-bold transition-all ${
                  actionType === 'lockdown' ? 'bg-red-500 hover:bg-red-600 text-white' :
                  actionType === 'sirens' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
                  actionType === 'floodlights' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                  'bg-gray-500 hover:bg-gray-600 text-white'
                }`}
              >
                <Check size={14} className="inline mr-1" />
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-lg text-xs font-mono-data border border-outline-variant hover:bg-surface-container transition-all"
              >
                <X size={14} className="inline mr-1" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Dashboard() {
  const [alertCount] = useState(42)
  const [cameraOnline] = useState(128)
  const [cameraTotal] = useState(130)
  const [heatMapMode, setHeatMapMode] = useState<'LIVE' | '24H'>('LIVE')
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(33)

  // Incident Response System State
  const [userRole, setUserRole] = useState<UserRole>('admin')
  const [selectedAlert, setSelectedAlert] = useState<string | null>('alert-001')
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([
    { id: '1', user: 'Admin', role: 'admin', action: 'dispatch', location: 'Sector 4', timestamp: '2026-04-30 04:12:08', note: 'Perimeter breach' }
  ])

  const hasContext = !!selectedAlert

  const handleActionConfirm = (action: ActionType) => {
    const newLog: ActionLog = {
      id: Date.now().toString(),
      user: userRole === 'admin' ? 'Admin' : userRole === 'operator' ? 'Operator' : 'Viewer',
      role: userRole,
      action,
      location: 'Sector 4 - Perimeter North',
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      note: `Triggered via Dashboard`
    }
    setActionLogs(prev => [newLog, ...prev])
  }

  return (
    <AppLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-mono-data text-primary-light uppercase tracking-widest text-sm">Operational Overview</span>
          <h2 className="font-display text-headline-lg text-on-background">Command Center</h2>
        </div>
        <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg border border-primary-light/20">
          <div className="w-2 h-2 rounded-full bg-primary-light animate-pulse"></div>
          <span className="font-mono-data text-primary-light text-xs uppercase tracking-widest">Systems Nominal : All Sectors Clear</span>
        </div>
      </div>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-5">
        {/* Stat Card: Total Alerts - Clickable to set context */}
        <div
          className={`md:col-span-2 lg:col-span-3 glass-card p-6 rounded-xl flex flex-col justify-between group cursor-pointer transition-all ${selectedAlert ? 'border-primary-light/30' : ''}`}
          onClick={() => setSelectedAlert(selectedAlert ? null : 'alert-001')}
        >
          <div className="flex justify-between items-start">
            <div className="p-2 bg-error/10 rounded-lg">
              <AlertTriangle className="text-error" size={20} />
            </div>
            <span className="font-mono-data text-error text-xs">+12% vs last 24h</span>
          </div>
          <div className="mt-10">
            <p className="font-label-caps text-on-surface-muted uppercase">Total Alerts</p>
            <h3 className="font-display text-5xl text-on-background mt-1 font-bold tracking-tight">{alertCount}</h3>
          </div>
        </div>

        {/* Stat Card: Online Cameras */}
        <div className="md:col-span-2 lg:col-span-3 glass-card p-6 rounded-xl flex flex-col justify-between group cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Video className="text-primary-light" size={20} />
            </div>
            <span className="font-mono-data text-primary-light text-xs uppercase tracking-widest">Active</span>
          </div>
          <div className="mt-10">
            <p className="font-label-caps text-on-surface-muted uppercase">Online Cameras</p>
            <h3 className="font-display text-5xl text-on-background mt-1 font-bold tracking-tight">{cameraOnline}/{cameraTotal}</h3>
          </div>
        </div>

        {/* Stat Card: Active Detections */}
        <div className="md:col-span-2 lg:col-span-3 glass-card p-6 rounded-xl flex flex-col justify-between group cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-tertiary/10 rounded-lg">
              <Eye className="text-tertiary" size={20} />
            </div>
            <span className="font-mono-data text-tertiary text-xs uppercase tracking-widest">Live</span>
          </div>
          <div className="mt-10">
            <p className="font-label-caps text-on-surface-muted uppercase">Active Detections</p>
            <h3 className="font-display text-5xl text-on-background mt-1 font-bold tracking-tight">18</h3>
          </div>
        </div>

        {/* Stat Card: System Health */}
        <div className="md:col-span-2 lg:col-span-3 glass-card p-6 rounded-xl flex flex-col justify-between group cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Shield className="text-green-400" size={20} />
            </div>
            <span className="font-mono-data text-green-400 text-xs uppercase tracking-widest">Optimal</span>
          </div>
          <div className="mt-10">
            <p className="font-label-caps text-on-surface-muted uppercase">System Health</p>
            <h3 className="font-display text-5xl text-on-background mt-1 font-bold tracking-tight">99.8%</h3>
          </div>
        </div>

        {/* Heatmap Visualization Card */}
        <div className="md:col-span-4 lg:col-span-6 row-span-2 glass-card p-6 rounded-xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-md text-on-background">Activity Heatmap</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setHeatMapMode('LIVE')}
                className={`px-3 py-1 text-xs font-mono-data rounded transition-all ${heatMapMode === 'LIVE' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-muted hover:text-on-background'}`}
              >
                LIVE
              </button>
              <button
                onClick={() => setHeatMapMode('24H')}
                className={`px-3 py-1 text-xs font-mono-data rounded transition-all ${heatMapMode === '24H' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-muted hover:text-on-background'}`}
              >
                24H
              </button>
            </div>
          </div>
          <div className="aspect-video relative rounded-lg overflow-hidden border border-outline-variant">
            <img
              className="w-full h-full object-cover opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZR6_gQQOWjdpAUisMdIWC_gvAzsAs4rnXa-NK68uogB77f8Rr2DvGW1GMPckfn2g8kQaefpklXKVFVxCKVqnqWLngpYuK2emVrl0v-a-jXpCfjW0eGlIr7Srrgw-wqXsvPwx1f7QFtfsFntpCn9PZ27UkYFNpwmS_yLL5tloItmI7QX-Ui6qs7OZDgukFZcXX-DxnXmTy87tjAaGa4c7_TQrXPiaxSyIR1bvx88V7PDnrR8lCdRb7OdyQtJhUK1-aClZfdpQslOc"
              alt="Heatmap"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-primary-light/40 blur-2xl rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-error-medium/30 blur-3xl rounded-full"></div>
            <div className="absolute top-1/2 left-2/3 w-12 h-12 bg-primary-light/50 blur-xl rounded-full"></div>
          </div>
          <div className="mt-6 flex justify-around">
            <div className="text-center">
              <p className="text-xs font-mono-data text-on-surface-muted mb-1">Peak Hour</p>
              <p className="font-bold text-primary-light">14:00 - 15:00</p>
            </div>
            <div className="w-px h-8 bg-outline-variant"></div>
            <div className="text-center">
              <p className="text-xs font-mono-data text-on-surface-muted mb-1">Dwell Time</p>
              <p className="font-bold text-primary-light">8.4 min avg</p>
            </div>
            <div className="w-px h-8 bg-outline-variant"></div>
            <div className="text-center">
              <p className="text-xs font-mono-data text-on-surface-muted mb-1">Risk Factor</p>
              <p className="font-bold text-error">Low (0.02)</p>
            </div>
          </div>
        </div>

        {/* Latest Event Preview - Context Selector */}
        <div
          className={`md:col-span-4 lg:col-span-6 glass-card rounded-xl overflow-hidden group cursor-pointer transition-all ${selectedAlert ? 'border-primary-light/30' : ''}`}
          onClick={() => setSelectedAlert(selectedAlert ? null : 'alert-001')}
        >
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Clock className="text-primary-light" size={18} />
              <span className="font-label-caps text-sm text-on-background uppercase">Latest Event : Perimeter North</span>
              {selectedAlert && <span className="px-2 py-0.5 bg-primary/20 text-primary-light text-[10px] rounded">Selected</span>}
            </div>
            <span className="font-mono-data text-on-surface-muted text-xs">04:12:08 AM</span>
          </div>
          <div className="relative aspect-[21/9]">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXWqklQKc_2JZ-ODy9XFf62ftoegVFZZCfLjKibzsHKbIaP2IVbDTmunvAW_h5HQTXWmPkrRgat5FZq49HqmyUzNWf-bWObrVzIKg09mIvTtUXnolAvPeiFEZzV36M5lgQM3B4p0uyuhkkjBLbeG8j5m1AqLZ5-tsBuq1P8AvjXj1xtjvYAQf0MS48QGJlBWf1lH-RxmH_GOwUW-LVhITHwXRawRdU9Ng4mpv4hT32KjUS9HnHvP5K4hU43aSXfFRgPe5YcI6G8QE"
              alt="Recording"
            />
            <div className="absolute inset-0 bg-primary-light/5 group-hover:bg-transparent transition-all"></div>
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-2 py-1 bg-surface/80 backdrop-blur-md rounded text-[10px] font-mono-data text-on-background border border-outline-variant">CAM-04</span>
              <span className="px-2 py-1 bg-primary/80 backdrop-blur-md rounded text-[10px] font-mono-data text-white font-bold">Motion Detected</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); setPlaying(!playing) }}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                {playing ? <Activity size={18} className="text-white" /> : <Video size={18} className="text-white ml-0.5" />}
              </button>
              <div className="flex-1 h-1 bg-outline-variant rounded-full overflow-hidden cursor-pointer" onClick={(e) => { e.stopPropagation(); setProgress((p) => (p + 20) % 100) }}>
                <div className="h-full bg-primary-light transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Trends Chart */}
        <div className="md:col-span-2 lg:col-span-3 glass-card p-6 rounded-xl">
          <h4 className="font-label-caps mb-4 text-on-surface-muted uppercase">Activity Trends</h4>
          <div className="flex items-end gap-2 h-32">
            {[40, 60, 30, 80, 100, 70, 50].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer ${i === 4 ? 'bg-primary-light/40 border-t-2 border-primary-light' : 'bg-primary/20 hover:bg-primary/40'}`}
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-mono-data text-on-surface-muted">
            <span>MON</span>
            <span>WED</span>
            <span>FRI</span>
            <span>SUN</span>
          </div>
        </div>

        {/* Object Distribution */}
        <div className="md:col-span-2 lg:col-span-3 glass-card p-6 rounded-xl">
          <h4 className="font-label-caps mb-4 text-on-surface-muted uppercase">Object Distribution</h4>
          <div className="space-y-3">
            {[
              { label: 'Person', value: 45, color: 'bg-primary-light' },
              { label: 'Vehicle', value: 30, color: 'bg-tertiary' },
              { label: 'Object', value: 25, color: 'bg-error-low' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface">{item.label}</span>
                  <span className="font-mono-data text-on-surface-muted">{item.value}%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Response Controls */}
        <div className="md:col-span-2 lg:col-span-3 glass-card p-6 rounded-xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-label-caps text-on-surface-muted uppercase">Response Actions</h4>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="text-[10px] bg-surface-container border border-outline-variant rounded px-2 py-1 text-on-surface-muted font-mono-data"
            >
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {!hasContext && (
            <div className="text-center py-4">
              <Info size={24} className="text-on-surface-muted mx-auto mb-2" />
              <p className="text-xs text-on-surface-muted">Select an event or alert to enable actions</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <ResponseAction icon={<Lock size={18} />} label="Lockdown" actionType="lockdown" userRole={userRole} hasContext={hasContext} onConfirm={handleActionConfirm} />
            <ResponseAction icon={<Megaphone size={18} />} label="Sirens" actionType="sirens" userRole={userRole} hasContext={hasContext} onConfirm={handleActionConfirm} />
            <ResponseAction icon={<Lightbulb size={18} />} label="Floodlights" actionType="floodlights" userRole={userRole} hasContext={hasContext} onConfirm={handleActionConfirm} />
            <ResponseAction icon={<Phone size={18} />} label="Dispatch" actionType="dispatch" userRole={userRole} hasContext={hasContext} onConfirm={handleActionConfirm} />
          </div>

          {actionLogs.length > 0 && (
            <div className="border-t border-outline-variant pt-3">
              <p className="text-[10px] font-mono-data text-on-surface-muted uppercase tracking-widest mb-2">Recent Logs</p>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {actionLogs.slice(0, 3).map((log) => (
                  <div key={log.id} className="text-[10px] font-mono-data text-on-surface-muted flex justify-between">
                    <span className="capitalize">{log.action}</span>
                    <span>{log.timestamp.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
