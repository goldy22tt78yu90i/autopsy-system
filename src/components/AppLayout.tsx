import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Shield, LayoutDashboard, Search, History, AlertTriangle,
  Brain, Settings, Bell, Menu, X, User, Moon, Sun, Film
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Search', path: '/search', icon: Search },
  { label: 'Events', path: '/events', icon: History },
  { label: 'Analysis', path: '/analysis', icon: Film },
  { label: 'Alerts', path: '/alerts', icon: AlertTriangle },
  { label: 'AI Insights', path: '/ai-insights', icon: Brain },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant shadow-lg transition-smooth-slow">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-on-surface-muted hover:text-primary-light transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-3">
            <Shield className="text-primary-light" size={24} />
            <h1 className="text-2xl font-bold tracking-tighter text-primary-light drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] font-display">OmniVision AI</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-on-surface-muted hover:bg-white/5 hover:text-primary-light transition-all rounded-full duration-200 flex items-center justify-center"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 text-on-surface-muted hover:bg-white/5 hover:text-primary-light transition-all rounded-full duration-200">
            <Bell size={20} />
          </button>
          <div className="h-8 w-8 rounded-full border border-primary-light/30 overflow-hidden bg-surface-container-highest flex items-center justify-center">
            <User size={16} className="text-primary-light" />
          </div>
        </div>
      </header>

      {/* NavigationDrawer (Desktop) */}
      <aside className={`hidden md:flex fixed left-0 top-0 h-full z-40 flex-col pt-20 bg-surface/95 backdrop-blur-xl border-r border-outline-variant shadow-2xl transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="px-6 mb-8 flex flex-col gap-1">
          {sidebarOpen && <p className="text-primary-light font-bold font-display text-xs uppercase tracking-widest">Control Room</p>}
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-display uppercase tracking-widest text-xs ${
                  active
                    ? 'bg-primary/20 text-primary-light border-r-2 border-primary-light shadow-[inset_0_0_15px_rgba(59,130,246,0.15)]'
                    : 'text-on-surface-muted hover:bg-white/5 hover:text-primary-light'
                } ${!sidebarOpen && 'justify-center'}`}
                title={item.label}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="px-6 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-2 text-on-surface-muted hover:text-primary-light transition-colors flex items-center justify-center"
          >
            {sidebarOpen ? <Menu size={18} className="rotate-180" /> : <Menu size={18} />}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="absolute left-0 top-0 h-full w-64 bg-surface/95 backdrop-blur-xl border-r border-outline-variant shadow-2xl pt-20 px-4">
            <div className="px-2 mb-6">
              <p className="text-primary-light font-bold font-display text-sm mt-1 uppercase tracking-widest">Control Room</p>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors font-display uppercase tracking-widest text-xs ${
                      active
                        ? 'bg-primary/20 text-primary-light border-r-2 border-primary-light'
                        : 'text-on-surface-muted hover:text-on-surface hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className={`pt-20 pb-24 px-6 min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* BottomNavBar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-surface/95 backdrop-blur-xl border-t border-outline-variant shadow-[0_-4px_20px_rgba(0,0,0,0.15)] rounded-t-2xl">
        {[
          { path: '/dashboard', icon: LayoutDashboard },
          { path: '/search', icon: Search },
          { path: '/events', icon: History },
          { path: '/alerts', icon: AlertTriangle },
          { path: '/ai-insights', icon: Brain },
          { path: '/settings', icon: Settings },
        ].map((item, idx) => {
          const active = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={idx}
              to={item.path}
              className={`${active ? 'text-primary-light drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]' : 'text-on-surface-muted'} active:scale-90 transition-transform`}
            >
              <Icon size={24} />
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <footer className={`w-full flex flex-col items-center gap-4 py-12 opacity-80 bg-surface/80 backdrop-blur-xl border-t border-outline-variant transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="flex items-center gap-8">
          <Link className="font-display text-[10px] tracking-widest text-on-surface-muted hover:text-primary-light transition-colors uppercase" to="/dashboard">Privacy Protocol</Link>
          <Link className="font-display text-[10px] tracking-widest text-on-surface-muted hover:text-primary-light transition-colors uppercase" to="/dashboard">System Status</Link>
          <Link className="font-display text-[10px] tracking-widest text-on-surface-muted hover:text-primary-light transition-colors uppercase" to="/dashboard">Support</Link>
        </div>
        <p className="font-display text-[10px] tracking-widest text-on-surface-muted uppercase">&copy; 2024 <span className="text-primary-light font-black">OmniVision AI</span>. Secure. Intelligent. Reliable.</p>
      </footer>
    </div>
  )
}
