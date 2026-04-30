import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Shield, LayoutDashboard, Search, History, AlertTriangle,
  Brain, Settings, Bell, Menu, X, User, Moon, Sun, Film,
  LogOut, Activity, UserCircle, Cog, Eye,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useNotifications } from '../context/NotificationContext'

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    subMenu: []
  },
  {
    label: 'Search',
    path: '/search',
    icon: Search,
    subMenu: [
      { label: 'Advanced Search', path: '/search?mode=advanced' },
      { label: 'Saved Searches', path: '/search?saved=true' },
    ]
  },
  {
    label: 'Events',
    path: '/events',
    icon: History,
    subMenu: [
      { label: 'Live Feed', path: '/events?filter=live' },
      { label: 'Recorded', path: '/events?filter=recorded' },
    ]
  },
  {
    label: 'Analysis',
    path: '/analysis',
    icon: Film,
    subMenu: [
      { label: 'Video Analysis', path: '/analysis/video' },
      { label: 'Behavioral', path: '/analysis/behavior' },
    ]
  },
  {
    label: 'Alerts',
    path: '/alerts',
    icon: AlertTriangle,
    subMenu: [
      { label: 'Critical', path: '/alerts?severity=high' },
      { label: 'Warnings', path: '/alerts?severity=medium' },
    ]
  },
  {
    label: 'AI Insights',
    path: '/ai-insights',
    icon: Brain,
    subMenu: [
      { label: 'ChatBot', path: '/ai-insights?tab=chat' },
      { label: 'Reports', path: '/ai-insights?tab=reports' },
    ]
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    subMenu: [
      { label: 'Profile', path: '/settings', tab: 'profile' },
      { label: 'Security', path: '/settings', tab: 'security' },
      { label: 'AI Detection', path: '/settings', tab: 'ai-detection' },
    ]
  },
]

const userData = {
  name: 'Emmanuella Dodoo',
  email: 'e.dodoo@icamautopsy.ai',
  role: 'admin',
  avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQE9C6iPZGMERg/profile-displayphoto-shrink_200_200/0/1721994229830?e=2147483647&v=beta&t=coFox-96DpMrrGeDHF0IbqSwhBTIV0AKyvrQwE-TSOA',
  sessionId: 'IC-7724.88',
  nodeId: 'HQ_CENTRAL_01',
  lastLogin: '2026-04-27 02:14:55',
}

const mockActivity = [
  { action: 'Login from Chrome - Windows 11', time: '2026-04-27 02:14:55', type: 'login' },
  { action: 'Search: "unauthorized vehicle"', time: '2026-04-27 02:08:12', type: 'search' },
  { action: 'Video analysis completed', time: '2026-04-27 01:55:00', type: 'analysis' },
  { action: 'Alert: Thermal Spike dismissed', time: '2026-04-27 01:42:15', type: 'alert' },
  { action: 'Viewed Events page', time: '2026-04-27 01:30:00', type: 'view' },
  { action: 'Searched: "person incident Sector 7"', time: '2026-04-27 01:15:00', type: 'search' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { unreadCount } = useNotifications()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  const avatarRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAvatarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setAvatarOpen(false)
    navigate('/signin')
  }

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'login': return <User size={14} className="text-green-600 dark:text-green-400" />
      case 'search': return <Search size={14} className="text-blue-600 dark:text-blue-400" />
      case 'analysis': return <Film size={14} className="text-purple-600 dark:text-purple-400" />
      case 'alert': return <AlertTriangle size={14} className="text-red-600 dark:text-red-400" />
      case 'view': return <Eye size={14} className="text-gray-500 dark:text-gray-400" />
      default: return <Activity size={14} className="text-gray-500" />
    }
  }

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
            <h1 className="text-2xl font-bold tracking-tighter text-primary-light drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] font-display">iCamAutopsy</h1>
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
          <button className="p-2 text-on-surface-muted hover:bg-white/5 hover:text-primary-light transition-all rounded-full duration-200 relative">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Avatar - Functional */}
          <div className="relative" ref={avatarRef}>
            <button
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="h-9 w-9 rounded-full bg-gray-800 dark:bg-white border-2 border-gray-600 dark:border-gray-300 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-400 transition-all hover:shadow-md active:scale-95 shadow-sm"
              title={userData.name}
            >
              {avatarError ? (
                <span className="text-sm font-semibold text-white dark:text-gray-700">
                  {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              ) : (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="h-full w-full rounded-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              )}
            </button>

            {/* Red notification dot */}
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800 dark:border-white"></span>

            {/* Dropdown Menu - Solid Professional Style */}
            <div
              ref={dropdownRef}
              className={`absolute right-0 top-16 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 transition-all duration-150 ${
                avatarOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              {/* User Info Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gray-800 dark:bg-white border-2 border-gray-600 dark:border-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {avatarError ? (
                      <span className="text-base font-semibold text-white dark:text-gray-700">
                        {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    ) : (
                      <img src={userData.avatar} alt={userData.name} className="h-full w-full object-cover" onError={() => setAvatarError(true)} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{userData.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userData.email}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                    userData.role === 'admin' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    userData.role === 'investigator' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {userData.role}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono truncate">
                    {userData.lastLogin}
                  </span>
                </div>
              </div>

              {/* Menu Items - Solid Style */}
              <div className="py-1.5">
                <button
                  onClick={() => {
                    setShowProfileModal(true)
                    setAvatarOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <UserCircle size={18} className="text-gray-400 dark:text-gray-500" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/settings')
                    setAvatarOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <Cog size={18} className="text-gray-400 dark:text-gray-500" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => {
                    setShowActivityModal(true)
                    setAvatarOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <Activity size={18} className="text-gray-400 dark:text-gray-500" />
                  <span>Activity</span>
                </button>

                <div className="my-1 border-t border-gray-100 dark:border-gray-700"></div>

                <button
                  onClick={() => {
                    toggleTheme()
                    setAvatarOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {theme === 'dark' ? <Sun size={18} className="text-gray-400" /> : <Moon size={18} className="text-gray-400" />}
                  <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </button>

                <div className="my-1 border-t border-gray-100 dark:border-gray-700"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
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
      </footer>

      {/* Profile Modal - Solid Professional Style */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowProfileModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-[fadeIn_0.15s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Profile</h3>
              <button onClick={() => setShowProfileModal(false)} className="p-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-gray-800 dark:bg-white border-2 border-gray-600 dark:border-gray-300 overflow-hidden">
                {avatarError ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-xl font-semibold text-white dark:text-gray-700">
                      {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <img src={userData.avatar} alt={userData.name} className="h-full w-full object-cover" onError={() => setAvatarError(true)} />
                )}
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{userData.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                  userData.role === 'admin' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                  userData.role === 'investigator' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {userData.role}
                </span>
              </div>
            </div>

            <div className="space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Session ID</span>
                <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{userData.sessionId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Node ID</span>
                <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{userData.nodeId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Last Login</span>
                <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{userData.lastLogin}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowProfileModal(false)
                navigate('/settings')
              }}
              className="w-full mt-6 py-2.5 px-4 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <Cog size={14} /> Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* Activity Modal - Solid Professional Style */}
      {showActivityModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowActivityModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-[fadeIn_0.15s_ease-out] max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h3>
              <button onClick={() => setShowActivityModal(false)} className="p-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {mockActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowActivityModal(false)
                navigate('/settings')
              }}
              className="w-full mt-6 py-2.5 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              View All Activity
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
