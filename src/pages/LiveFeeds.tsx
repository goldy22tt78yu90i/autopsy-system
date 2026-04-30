import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import {
  Video, Mic, Camera, Maximize2, AlertTriangle,
  Car, Lock, ShieldCheck, User
} from 'lucide-react'

const alerts = [
  {
    icon: <User size={20} className="text-teal-400" />,
    title: 'Person Detected',
    detail: 'Subject identified at Front Gate entrance.',
    location: 'FRONT GATE',
    time: '14:32:01',
    type: 'normal' as const,
  },
  {
    icon: <AlertTriangle size={20} className="text-error" />,
    title: 'Unusual Activity',
    detail: 'Loitering detected in restricted Parking Area B zone.',
    location: 'PARKING AREA',
    time: '14:28:45',
    type: 'warning' as const,
  },
  {
    icon: <Car size={20} className="text-teal-400" />,
    title: 'Vehicle Entry',
    detail: 'Black SUV [K-8291] entered south parking wing.',
    location: 'FRONT GATE',
    time: '14:15:22',
    type: 'normal' as const,
  },
  {
    icon: <Lock size={20} className="text-teal-400" />,
    title: 'Access Granted',
    detail: 'Authorized entry: Employee ID #0024 at Office Main.',
    location: 'OFFICE',
    time: '14:02:10',
    type: 'normal' as const,
  },
]

const feeds = [
  {
    id: 'front-gate',
    name: 'Front Gate',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3w-PjlmmhX_XElFYVuWYPJG8fRN6sh6o_5FB0v5rQcuuOn-lkPEsyxNQTbGzug6817HC6UfTWFGiYJTP-fBTXhEJVGW4FjE3JKS2rVt2vk93Yhk62PbwenOqhOaOOSay6TPAtw0fmY1j5ox57sEi3se4dJd4ctwOBCH1cpmCZskDrBsm-l4q62k-z5ZxZz4k3j9Vm7EbJYeW0P0mvsk1A7rIp9WDOhHd_aVa32_VJG-C61jywx7jhK0YGitWStpbBJbZfPcRzpZg',
    objects: [
      { label: 'Person 98%', top: '30%', left: '45%', width: '8rem', height: '16rem', color: 'border-teal-400' },
      { label: 'Vehicle 92%', top: '10%', left: '10%', width: '16rem', height: '10rem', color: 'border-white/40' },
    ],
  },
  {
    id: 'office',
    name: 'Office Main',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0pqh-DdNn5IltLDmoQX3iGZMqcyddHHqD04uYFs1vkyfFba9QR8gjzJe796tA29K0FMYvUNCGCcDTWYnaiS9ujT_1kNM_az7wpOoAUEFHfWaEhDJejLupGg4esExsDotnfF6F2MfjLt5pNzMqvkvN7tA9jf4G0vM-F1GyZVBAU2NAOjaby-YN1pJv_Jp8YwyFqUML5vcVmfWgm0KA3tSDvXunkugVTnmJYezqn-0h4NM_-N3dF5wfCv3emi-ep3NgTDfwMMGHY3A',
    objects: [
      { label: 'Person 99%', top: '40%', left: '60%', width: '6rem', height: '14rem', color: 'border-teal-400' },
    ],
  },
  {
    id: 'parking',
    name: 'Parking Area B',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpGqpTwkYnD8HN4GcvRdzIyKy9s80WoWjs00I5WivKv2XX1loU5AoH5tA7JgDPwWLRXVZInKsqhoxGspktwXt74i5QYjn-sBxgNAXiGs0GCdt-bofM0nxqgjDlIc0J-XHH9vFzCpS9A4J4mu8q0OXXyAAsweQ3btWVAylzC0Dxq8xzSY-nNu_AH7hcNnbMQsh2ccOQu5f-FppjkbCHtf9ltDa_4Xdz-ftInwTQ8IVcR1VEXJAshxsN6bL96ST4oh5nbEYFbqlSZ5w',
    objects: [
      { label: 'Vehicle 84%', top: '20%', left: '15%', width: '12rem', height: '8rem', color: 'border-white/40' },
      { label: 'Vehicle 96%', top: '25%', left: '55%', width: '10rem', height: '7rem', color: 'border-white/40' },
    ],
    wide: true,
  },
]

export default function LiveFeeds() {
  const [mutedFeeds, setMutedFeeds] = useState<Record<string, boolean>>({})
  const [fullscreenFeed, setFullscreenFeed] = useState<string | null>(null)

  const toggleMute = (id: string) => {
    setMutedFeeds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <AppLayout>
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-on-background">Surveillance Command</h2>
          <p className="text-on-background-variant font-body-md">Active Monitoring: 3 Feeds Online | System Nominal</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-bright px-4 py-2 rounded-lg border border-white/5 transition-all text-on-background-variant font-label-bold">
            <Video size={16} />
            Layout
          </button>
          <button className="flex items-center gap-2 bg-teal-500 text-slate-950 px-4 py-2 rounded-lg font-label-bold shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:scale-105 transition-transform">
            <ShieldCheck size={16} />
            Connect Camera
          </button>
        </div>
      </div>

      {/* Camera Grid + Alerts Panel */}
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {feeds.map((feed) => (
              <div
                key={feed.id}
                className={`glass-panel rounded-xl overflow-hidden group ${feed.wide ? 'lg:col-span-2' : ''}`}
              >
                <div className="relative aspect-video bg-black">
                  <img
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    src={feed.src}
                    alt={feed.name}
                  />
                  {/* AI Overlays */}
                  <div className="absolute inset-0 pointer-events-none">
                    {feed.objects.map((obj, i) => (
                      <div
                        key={i}
                        className={`absolute border-2 rounded-sm ${obj.color}`}
                        style={{
                          top: obj.top,
                          left: obj.left,
                          width: obj.width,
                          height: obj.height,
                        }}
                      >
                        <span className="absolute -top-6 left-0 bg-teal-500 text-slate-950 px-2 py-0.5 text-[10px] font-mono-data rounded-t-sm uppercase">
                          {obj.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* HUD Status */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-red-500 pulse"></div>
                      <span className="text-[10px] font-mono-data tracking-widest text-white uppercase">Live</span>
                    </div>
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono-data text-on-background-variant">{feed.name}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono-data text-teal-400 bg-black/60 px-2 py-1 rounded border border-teal-500/20">
                    FPS: 60 | BW: 4.2 MBPS
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="flex gap-4">
                    <button
                      onClick={() => toggleMute(feed.id)}
                      className={`transition-colors ${mutedFeeds[feed.id] ? 'text-slate-600' : 'text-on-background-variant hover:text-teal-400'}`}
                    >
                      <Mic size={18} />
                    </button>
                    <button className="text-on-background-variant hover:text-teal-400 transition-colors">
                      <Video size={18} />
                    </button>
                    <button className="text-on-background-variant hover:text-teal-400 transition-colors">
                      <Camera size={18} />
                    </button>
                  </div>
                  <button
                    onClick={() => setFullscreenFeed(feed.id)}
                    className="text-on-background-variant hover:text-white transition-colors"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Panel: AI Alerts (Desktop Only) */}
        <aside className="hidden lg:flex w-80 flex-col bg-slate-950/60 backdrop-blur-3xl border border-white/10 rounded-xl overflow-hidden h-fit">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-headline-md text-teal-400">AI Alerts</h3>
            <span className="bg-teal-500/20 text-teal-300 text-[10px] px-2 py-0.5 rounded uppercase font-mono-data">Live Feed</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[600px]">
            {alerts.map((alert, i) => (
              <AlertCard key={i} alert={alert} />
            ))}
          </div>
          <div className="p-4 border-t border-white/10">
            <button className="w-full py-3 text-xs font-display uppercase tracking-widest text-slate-400 hover:text-teal-300 transition-colors">
              View All Logs
            </button>
          </div>
        </aside>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenFeed && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
          onClick={() => setFullscreenFeed(null)}
        >
          <div className="relative max-w-6xl w-full">
            <img
              className="w-full h-auto rounded-xl"
              src={feeds.find((f) => f.id === fullscreenFeed)?.src}
              alt="Fullscreen"
            />
            <button
              onClick={() => setFullscreenFeed(null)}
              className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg font-mono-data text-sm hover:bg-black/80 transition-colors"
            >
              ESC to close
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

function AlertCard({ alert }: { alert: typeof alerts[number] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`p-4 rounded-lg border transition-all cursor-pointer ${
        alert.type === 'warning'
          ? 'bg-error-container/10 border-error/20 hover:border-error/50'
          : hovered
          ? 'border-teal-500/50'
          : 'bg-surface-container-low border-white/5'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`flex items-center gap-3 mb-2 ${alert.type === 'warning' ? 'text-error' : ''}`}>
        {alert.icon}
        <span className={`font-label-bold ${alert.type === 'warning' ? '' : 'text-on-background'}`}>
          {alert.title}
        </span>
      </div>
      <p className="text-xs text-on-background-variant mb-2">{alert.detail}</p>
      <div className="flex justify-between items-center text-[10px] font-mono-data text-slate-500">
        <span>{alert.location}</span>
        <span>{alert.time}</span>
      </div>
    </div>
  )
}
