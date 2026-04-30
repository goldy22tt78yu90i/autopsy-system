import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import {
  Brain, Download, AlertTriangle, Info, Zap, BarChart3, PieChart
} from 'lucide-react'

export default function AIInsights() {
  const [confidence] = useState(99.8)
  const [visualProcessing] = useState(99.9)
  const [behavioralAnalysis] = useState(98.4)

  return (
    <AppLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display text-headline-lg text-on-background mb-1">Neural Core Analytics</h2>
          <p className="text-on-surface-muted text-body-md">Advanced AI diagnostics and predictive security modeling</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary-light animate-pulse"></div>
            <span className="font-mono-data text-xs text-primary-light uppercase tracking-widest">Core System Active</span>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Download size={16} />
            Export Intel
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Main Chart: Daily Events */}
        <div className="md:col-span-8 glass-card rounded-xl p-6 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline-md text-on-background">Security Event Frequency</h3>
              <p className="text-sm text-on-surface-muted">Detected anomalies vs Neutralized threats (24h)</p>
            </div>
            <div className="flex items-center gap-4 font-mono-data text-xs">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary-light"></span> Detected</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-tertiary"></span> Predicted</div>
            </div>
          </div>
          {/* SVG Chart Visualization */}
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
              {/* Grid Lines */}
              <line stroke="rgba(255,255,255,0.05)" x1="0" x2="800" y1="0" y2="0"></line>
              <line stroke="rgba(255,255,255,0.05)" x1="0" x2="800" y1="50" y2="50"></line>
              <line stroke="rgba(255,255,255,0.05)" x1="0" x2="800" y1="100" y2="100"></line>
              <line stroke="rgba(255,255,255,0.05)" x1="0" x2="800" y1="150" y2="150"></line>
              {/* Area Fill */}
              <path d="M0 180 Q 100 150, 200 170 T 400 100 T 600 140 T 800 50 L 800 200 L 0 200 Z" fill="url(#grad1)" opacity="0.3"></path>
              {/* Line Path */}
              <path d="M0 180 Q 100 150, 200 170 T 400 100 T 600 140 T 800 50" fill="none" stroke="#3B82F6" strokeWidth="3"></path>
              {/* Predicted Path (Dashed) */}
              <path d="M0 190 Q 120 160, 220 185 T 420 130 T 620 160 T 820 80" fill="none" opacity="0.5" stroke="#06B6D4" strokeDasharray="8 4" strokeWidth="2"></path>
              <defs>
                <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }}></stop>
                  <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0 }}></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
              <div className="h-full w-px bg-outline-variant"></div>
              <div className="h-full w-px bg-outline-variant"></div>
              <div className="h-full w-px bg-outline-variant"></div>
              <div className="h-full w-px bg-outline-variant"></div>
            </div>
          </div>
          <div className="flex justify-between mt-4 font-mono-data text-xs text-on-surface-muted">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
          </div>
        </div>

        {/* AI Accuracy Gauge */}
        <div className="md:col-span-4 glass-card rounded-xl p-6 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-headline-md text-on-background">Precision Core</h3>
            <p className="text-sm text-on-surface-muted">Neural Network Confidence Rating</p>
          </div>
          <div className="relative flex items-center justify-center py-8">
            {/* Circle Gauge */}
            <div className="w-32 h-32 rounded-full border-4 border-outline-variant flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary-light border-t-transparent border-r-transparent rotate-45"></div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary-light">{confidence}</span>
                <p className="text-[10px] text-on-surface-muted font-mono-data uppercase">Percent</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-on-surface-muted">Visual Processing</span>
                <span className="text-primary-light font-mono-data">{visualProcessing}%</span>
              </div>
              <div className="w-full bg-surface-container h-1 rounded-full">
                <div className="bg-primary-light h-1 rounded-full transition-all duration-1000" style={{ width: `${visualProcessing}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-on-surface-muted">Behavioral Analysis</span>
                <span className="text-primary-light font-mono-data">{behavioralAnalysis}%</span>
              </div>
              <div className="w-full bg-surface-container h-1 rounded-full">
                <div className="bg-primary-light h-1 rounded-full transition-all duration-1000" style={{ width: `${behavioralAnalysis}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Threat Analysis */}
        <div className="md:col-span-12 glass-card rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <h3 className="font-headline-md text-on-background flex items-center gap-2">
              <Brain className="text-tertiary" size={20} />
              Predictive Threat Vectors
            </h3>
            <div className="flex gap-2">
              <span className="bg-error/10 text-error px-3 py-1 rounded text-[10px] font-mono-data uppercase tracking-tight">High Probability</span>
              <span className="bg-tertiary/10 text-tertiary px-3 py-1 rounded text-[10px] font-mono-data uppercase tracking-tight">AI Projection</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ThreatCard
              icon={<AlertTriangle size={16} className="text-error" />}
              location="PERIMETER WEST"
              title="Unauthorized Ingress Pattern"
              description="AI detected recursive movement patterns in low-light blindspots. 84% probability of breach attempt within 02:00h."
              confidence="HIGH"
              action="Deploy Drone"
            />
            <ThreatCard
              icon={<Info size={16} className="text-primary-light" />}
              location="DATA CENTER 4"
              title="Thermal Variance Detected"
              description="Unusual heat signature near server rack 12A. Predictive analysis suggests cooling failure in 4.5 hours."
              confidence="MED"
              action="Log Ticket"
            />
            <ThreatCard
              icon={<Zap size={16} className="text-tertiary" />}
              location="SOUTH GATE"
              title="Crowd Density Anomaly"
              description="Projected bottlenecking at South Gate during shift change. AI recommends opening backup lane Delta-2."
              confidence="92%"
              action="Auto-Optimize"
            />
          </div>
        </div>

        {/* Activity Distribution */}
        <div className="md:col-span-6 glass-card rounded-xl p-6">
          <h3 className="font-headline-md text-on-background mb-6 flex items-center gap-2">
            <PieChart size={18} className="text-primary-light" />
            Object Distribution
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Person', value: 45, color: 'bg-primary-light' },
              { label: 'Vehicle', value: 30, color: 'bg-tertiary' },
              { label: 'Object', value: 25, color: 'bg-error-low' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-on-background">{item.label}</span>
                  <span className="font-mono-data text-on-surface-muted">{item.value}%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Activity Hours */}
        <div className="md:col-span-6 glass-card rounded-xl p-6">
          <h3 className="font-headline-md text-on-background mb-6 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary-light" />
            Peak Activity Hours
          </h3>
          <div className="flex items-end gap-3 h-40">
            {[30, 45, 60, 80, 95, 70, 50, 85, 90, 75, 60, 40].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer bg-primary-light/20 hover:bg-primary-light/40"
                style={{ height: `${h}%` }}
                title={`${i + 8}:00 - ${h}%`}
              ></div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-mono-data text-on-surface-muted">
            <span>8AM</span>
            <span>12PM</span>
            <span>4PM</span>
            <span>8PM</span>
          </div>
        </div>

        {/* Live Object Intelligence */}
        <div className="md:col-span-12 glass-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-md text-on-background">Live Object Intelligence</h3>
            <span className="text-xs font-mono-data text-on-surface-muted">Streaming neural telemetry...</span>
          </div>
          <div className="divide-y divide-outline-variant">
            <ObjectItem
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAsjPv0CBhPXJKq6AD4C-QZpSc0XrBbTUUbFLXa0rONSu_i9p2xgnUm2zs4jmEWa8wWuvr5fCIncEzc6iXEiLXsjCbIUwo9ie0GH8krqBoWVePPlbBvTgBm0OGAyeyMBqIpY85cqVUN7szf9-F1QWbWCC_0A37uLekYQ_KNQAHAx8oHxVYX0G-frMW4aVFeYxxsJxt_mmaERnyuIbDA5b0N-Qh1PalFqNji8L-baLCWkRB-Qn3OZttai0LMCiPjvQuhohoLkeOvJ3c"
              title="Vehicle Identification"
              detail="Plate: TX-90210 • Black SUV • Unauthorized Area"
              status="MATCH FOUND (99.2%)"
              statusColor="text-primary-light"
              time="02m 45s ago"
            />
            <ObjectItem
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBwxprmhrRV9jYMgiGvVGDfcOxj7AiSjzcR1IH__9jullMNdGN5CgSPMU_djfaPT67SJQCbgGfMgROimbnm5aIZC2RGyM5kKPxR9yZ3ytuthY2QuZgKNzvS55OqJftZvWJULUQCv4_U6Rmrf9wHoMFoqnvnioMW8IYLXI-lRflU-2Bj_Mo5bO-dYkntfuNQmt2D2aEiSjyHSLgGaVyHCpttUIdHdBBZN0qJJiheF3Q8Dk1iuSHz6W-fo-5-vnfOWxOMGpjdPLHO1uc"
              title="Biometric Signature"
              detail="Unknown ID • Perimeter East • Loitering Event"
              status="PENDING AUTH"
              statusColor="text-error"
              time="05m 12s ago"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function ThreatCard({ icon, location, title, description, confidence, action }: {
  icon: React.ReactNode
  location: string
  title: string
  description: string
  confidence: string
  action: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`bg-surface-container p-4 rounded-lg border transition-all cursor-default ${hovered ? 'border-primary-light/30' : 'border-outline-variant'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between mb-3">
        <span className="text-[10px] font-mono-data text-on-surface-muted uppercase">LOC: {location}</span>
        {icon}
      </div>
      <p className="font-label-bold text-on-background mb-2">{title}</p>
      <p className="text-xs text-on-surface-muted leading-relaxed mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono-data text-primary-light">CONFIDENCE: {confidence}</span>
        <button className="text-[10px] text-primary-light font-bold hover:underline">{action}</button>
      </div>
    </div>
  )
}

function ObjectItem({ imageSrc, title, detail, status, statusColor, time }: {
  imageSrc: string
  title: string
  detail: string
  status: string
  statusColor: string
  time: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`px-6 py-4 flex items-center justify-between transition-colors cursor-pointer ${hovered ? 'bg-white/5' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded bg-surface-container-highest flex items-center justify-center overflow-hidden">
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-label-bold text-on-background">{title}</p>
          <p className="text-xs text-on-surface-muted">{detail}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-xs font-mono-data ${statusColor}`}>{status}</p>
        <p className="text-[10px] text-on-surface-muted">{time}</p>
      </div>
    </div>
  )
}
