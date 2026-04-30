import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Play, Download, Share, Search, Clock, Video, Filter, ChevronDown } from 'lucide-react'

const recordings = [
  {
    id: 'OV-2938',
    title: 'Front Gate - Movement Detected',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2ATcn3PxK8ErDHMxHz4nUhi65mvDharUaHiPZEobndcGNKdwOvhlP0S6PwSi5hpycRewXbBqe3QDc5iqRJAoBEqHJAF2mtrCkmWqqN8Zx0m_EbvXB-c2yi6ZkPJ6ukuRcGE-zbwy3i7Q3yzYLb2N9MPxH09zksTQPal3BzBWfB47Wvztn3g4AuOagwvLWXtv-RzbtZP7msQ_jO36OlTSaGA01UZxrXXvq1JhQghFJTXnKrcnRORGv_RO6zgwPlUWvEsDbkO9zfPk',
    duration: '00:14:22',
    timeAgo: '2 HOURS AGO',
    camera: 'CAM_01',
    badge: 'ALERT',
    badgeColor: 'bg-red-500/80 text-white',
    hasPulse: true,
  },
  {
    id: 'OV-4410',
    title: 'Warehouse North - Routine Archive',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH7NjSu9NFlfmNOHdfO-DgM6llKjRYb0sQIxKr7tXOT134thk1pykzjk3LZnl-T8lwqTAr1au7OzAAupD03wm7hJb4G1oc9SbAsRgJGmU2vIPBmy7iA4k9AmkHD9KC_L1PLRdW75v6pTOfqf6ZVkzHPZPHGCRfuAiPj0JYfctOpLOvKotbj1D6WtmhymQv7pGPOqgzn_voglUjd2Qy7GhKLs5DsZsdLsTzzqedrrr_yhkLTZQAGL3FkzqCmOFs8hpJeh2m5AU6vgA',
    duration: '05:00:00',
    timeAgo: '5 HOURS AGO',
    camera: 'CAM_04',
    badge: 'SYSTEM_CHECK',
    badgeColor: 'bg-teal-500/80 text-slate-950',
    hasPulse: false,
  },
  {
    id: 'OV-8821',
    title: 'Executive Wing - Human Presence',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZhwNm4bUezn-2iDFOJyQB4RiA2Jw8LYJaizp8jF7N5AIKH1cBsJbfBlLCt_JgaxnoHnG8aFEBL6EL4Sd9CYdG3pTZ27qHbnU58micgYzDtGTiGuaQNCfZzh6HJw9eZ6k5ivzFgZIVCD_gNdCT6Pw3aGCgpf0PsmnL9GbO0jSRWvSxGCf5z_oR9713-kLSS7WXkkDlMa_O_Ltk0XoYGIUlcEd6TRwrk2qvLnANkY2K0zrMfY0utXpHc5-CTJz8RpNZPL7Dv8DYu1A',
    duration: '00:03:45',
    timeAgo: '8 HOURS AGO',
    camera: 'CAM_08',
    badge: 'TRIGGER',
    badgeColor: 'bg-red-500/80 text-white',
    hasPulse: false,
  },
  {
    id: 'OV-1102',
    title: 'Perimeter West - Continuous Feed',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhaUkSIoYdCGQAOpL7HS5mGUmR8k2Mg6AbB6PnMwuGeNdJOjipJkhfZ1ipvLsdGlcU3AHYBK7ICK97LHzkmRc-0veYNnEb1gTQbO1LvCiAyWT5Mf0763CkLihnzH3dn4KkpczJ4YPyxPOgGnrXRHHX6iD5jvp2INtISd0Ac34xEN0XqGqSVu-XNn8UDarS-QOv8I_4AMGg18qOxFTGm-ys-VaMXnTZ2FRDbBlQkbrab6a0bfhvFRkkYxz-HOnEW5RALt2Ro-xiGTI',
    duration: '01:20:10',
    timeAgo: 'YESTERDAY',
    camera: 'CAM_02',
    badge: null,
    badgeColor: '',
    hasPulse: false,
  },
]

export default function Recordings() {
  const [cameraFilter, setCameraFilter] = useState('ALL_UNITS')
  const [dateFilter, setDateFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <AppLayout>
      {/* Header & HUD Filter Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono-data text-[10px] text-primary/70 uppercase tracking-widest">SYSTEM_LOG // ARCHIVE</span>
              <div className="h-[1px] w-12 bg-primary/30"></div>
            </div>
            <h1 className="font-headline-lg text-on-background tracking-tighter">Recordings</h1>
          </div>

          {/* Tactical Filter Bar */}
          <div className="glass-panel p-4 rounded-lg flex flex-wrap items-center gap-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 scanline opacity-10"></div>

            <div className="flex flex-col gap-1">
              <label className="font-mono-data text-[10px] text-primary/70 uppercase">Filter_Camera</label>
              <div className="relative group">
                <select
                  value={cameraFilter}
                  onChange={(e) => setCameraFilter(e.target.value)}
                  className="bg-slate-900/80 border-0 border-b border-outline text-on-surface text-mono-data focus:ring-0 focus:border-primary w-40 appearance-none py-1 px-2 cursor-pointer"
                >
                  <option>ALL_UNITS</option>
                  <option>GATE_01</option>
                  <option>PERIMETER_NORTH</option>
                  <option>LOBBY_SECURE</option>
                </select>
                <ChevronDown className="absolute right-0 top-1 text-primary/50 text-sm pointer-events-none" size={16} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono-data text-[10px] text-primary/70 uppercase">Temporal_Range</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-slate-900/80 border-0 border-b border-outline text-on-surface text-mono-data focus:ring-0 focus:border-primary py-1 px-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono-data text-[10px] text-primary/70 uppercase">Search_Metadata</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900/80 border-0 border-b border-outline text-on-surface text-mono-data focus:ring-0 focus:border-primary py-1 pl-2 pr-8 w-48 placeholder:text-slate-600"
                />
                <Search className="absolute right-2 top-1 text-primary/50 text-sm" size={16} />
              </div>
            </div>

            <button className="bg-primary text-on-primary px-6 py-2 rounded-sm font-label-caps flex items-center gap-2 shadow-[0_0_15px_rgba(87,241,219,0.3)] hover:brightness-110 transition-all">
              <Filter size={16} />
              RECALIBRATE
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid of Recordings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recordings.map((recording) => (
          <div key={recording.id} className="group relative glass-panel overflow-hidden hover:border-primary/50 transition-all duration-500">
            <div className="hud-bracket-tl"></div>
            <div className="hud-bracket-tr"></div>
            <div className="hud-bracket-bl"></div>
            <div className="hud-bracket-br"></div>

            <div className="relative aspect-video overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.5] group-hover:grayscale-0"
                src={recording.image}
                alt={recording.title}
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all flex items-center justify-center">
                <button className="w-14 h-14 rounded-full border-2 border-primary/50 flex items-center justify-center bg-slate-950/60 text-primary backdrop-blur-md group-hover:scale-110 transition-transform">
                  <Play size={32} fill="currentColor" />
                </button>
              </div>

              {recording.badge && (
                <div className={`absolute top-3 left-3 ${recording.badgeColor} text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 uppercase font-mono-data tracking-widest`}>
                  {recording.hasPulse && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
                  {recording.badge}
                </div>
              )}

              <div className="absolute bottom-3 right-3 bg-slate-950/80 px-2 py-1 text-[10px] font-mono-data text-primary border border-primary/20">
                {recording.duration}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-b from-transparent to-slate-950/60">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-md text-on-surface group-hover:text-primary transition-colors">{recording.title}</h3>
                <span className="font-mono-data text-[10px] text-outline mt-1">ID: {recording.id}</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-outline text-mono-data text-[11px]">
                  <Clock size={14} />
                  {recording.timeAgo}
                </div>
                <div className="flex items-center gap-1.5 text-outline text-mono-data text-[11px]">
                  <Video size={14} />
                  {recording.camera}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-outline-variant/30">
                <button className="flex-1 bg-slate-900 hover:bg-primary/10 border border-outline-variant hover:border-primary/40 text-on-surface hover:text-primary py-2 px-3 rounded text-[11px] font-label-caps transition-all flex items-center justify-center gap-2">
                  <Download size={16} />
                  DOWNLOAD
                </button>
                <button className="flex-1 bg-slate-900 hover:bg-primary/10 border border-outline-variant hover:border-primary/40 text-on-surface hover:text-primary py-2 px-3 rounded text-[11px] font-label-caps transition-all flex items-center justify-center gap-2">
                  <Share size={16} />
                  SHARE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
