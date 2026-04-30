import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { useTheme } from '../context/ThemeContext'
import {
  User, Shield, Brain, Search, Bell, Mic, FolderOpen, Database, Palette,
  Fingerprint, Eye, EyeOff, AlertTriangle,
  SlidersHorizontal, Save, Trash2, Power, ChevronRight, Check,
  Video, Globe, Upload, Webhook, Moon, Sun
} from 'lucide-react'

type SettingsTab =
  | 'profile' | 'security' | 'ai-detection' | 'search' | 'alerts'
  | 'voice' | 'cases' | 'storage' | 'appearance' | 'integrations'

interface UserProfile {
  name: string
  email: string
  role: 'admin' | 'investigator' | 'viewer'
  avatar: string
  sessionId: string
  nodeId: string
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Emmanuella Dodoo',
    email: 'e.dodoo@omnivision.ai',
    role: 'admin',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQE9C6iPZGMERg/profile-displayphoto-shrink_200_200/0/1721994229830?e=2147483647&v=beta&t=coFox-96DpMrrGeDHF0IbqSwhBTIV0AKyvrQwE-TSOA',
    sessionId: 'OV-7724.88',
    nodeId: 'HQ_CENTRAL_01'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Security
  const [biometricLock, setBiometricLock] = useState(true)
  const [twoFactor, setTwoFactor] = useState(true)
  const [permissions, setPermissions] = useState({
    viewVideo: true,
    exportEvidence: true,
    manageCases: true,
  })

  // AI Detection
  const [detectionTypes, setDetectionTypes] = useState({
    people: true,
    vehicles: true,
    objects: true,
  })
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.85)
  const [loiteringDuration, setLoiteringDuration] = useState(5)
  const [motionSensitivity, setMotionSensitivity] = useState(70)

  // Search
  const [defaultTimeRange, setDefaultTimeRange] = useState('24h')
  const [defaultObjectType, setDefaultObjectType] = useState('all')
  const [searchMode, setSearchMode] = useState<'exact' | 'fuzzy'>('fuzzy')
  const [resultLimit, setResultLimit] = useState(50)

  // Alerts
  const [alertRules] = useState([
    { id: '1', name: 'Intruder Detection', severity: 'high' as const, channels: { inApp: true, email: true } },
    { id: '2', name: 'Unauthorized Vehicle', severity: 'medium' as const, channels: { inApp: true, email: false } },
    { id: '3', name: 'Thermal Spike', severity: 'medium' as const, channels: { inApp: true, email: true } },
  ])
  const [newRuleName, setNewRuleName] = useState('')
  const [newRuleSeverity, setNewRuleSeverity] = useState<'low' | 'medium' | 'high'>('medium')

  // Voice
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [voiceLanguage, setVoiceLanguage] = useState('en-US')
  const [micPermission, setMicPermission] = useState(true)
  const [commandSensitivity, setCommandSensitivity] = useState(75)

  // Cases
  const [defaultCaseSettings, setDefaultCaseSettings] = useState({
    autoSave: true,
    exportVideo: true,
    exportReports: true,
  })

  // Storage
  const [retentionPeriod, setRetentionPeriod] = useState(30)
  const [archiveAfter, setArchiveAfter] = useState(7)
  const [storageUsed] = useState({ used: 742, total: 1024 })

  // Appearance
  const { theme, toggleTheme } = useTheme()
  const [uiDensity, setUiDensity] = useState<'comfortable' | 'compact'>('comfortable')

  // Integrations
  const [apiKeys] = useState({
    vision: 'sk-****-****-****-xK9p',
    analytics: 'ak-****-****-****-mQ3r',
  })
  const [webhookUrl, setWebhookUrl] = useState('')

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'ai-detection', label: 'AI Detection', icon: <Brain size={18} /> },
    { id: 'search', label: 'Search', icon: <Search size={18} /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell size={18} /> },
    { id: 'voice', label: 'Voice', icon: <Mic size={18} /> },
    { id: 'cases', label: 'Cases', icon: <FolderOpen size={18} /> },
    { id: 'storage', label: 'Storage', icon: <Database size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'integrations', label: 'Integrations', icon: <Webhook size={18} /> },
  ]

  return (
    <AppLayout>
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/20 rounded-lg">
            <SlidersHorizontal className="text-primary-light" size={24} />
          </div>
          <div>
            <h2 className="font-headline-lg text-on-background">System Settings</h2>
            <p className="text-sm text-on-surface-muted">Configure your OmniVision AI experience</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="glass-card rounded-xl p-2 sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary-light border-l-2 border-primary-light'
                      : 'text-on-surface-muted hover:bg-white/5 hover:text-on-background'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <SectionHeader icon={<User size={20} />} title="Profile" description="Manage your account information" />
                <div className="glass-card rounded-xl p-6 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-2 border-primary-light p-1">
                        <img alt="Profile" className="w-full h-full rounded-full object-cover" src={profile.avatar} />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-primary-light text-white p-1 rounded-sm flex items-center justify-center">
                        <Check size={14} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-headline-md text-on-background">{profile.name}</h3>
                      <p className="text-sm text-on-surface-muted">{profile.email}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-primary/20 text-primary-light rounded-full text-xs font-medium uppercase">
                        {profile.role}
                      </span>
                    </div>
                    <button className="btn-secondary text-sm py-2 px-4">
                      <Upload size={14} /> Change Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="input-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="input-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-outline-variant pt-6">
                    <h4 className="font-label-bold text-on-background">Change Password</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="input-primary pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-muted hover:text-on-background"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Confirm Password</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="input-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 border-t border-outline-variant pt-6">
                    <button className="btn-secondary text-sm py-2 px-6">Cancel</button>
                    <button className="btn-primary text-sm py-2 px-6">
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>

                {/* Session / Device Management */}
                <div className="glass-card rounded-xl p-6 space-y-4">
                  <h4 className="font-label-bold text-on-background">Active Sessions</h4>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome - Windows 11', location: 'HQ Central', time: 'Active Now', current: true },
                      { device: 'Mobile App - iOS', location: 'HQ Central', time: '2 hours ago', current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${session.current ? 'bg-green-400' : 'bg-on-surface-muted'}`}></div>
                          <div>
                            <p className="text-sm font-medium text-on-background">{session.device}</p>
                            <p className="text-xs text-on-surface-muted">{session.location} • {session.time}</p>
                          </div>
                        </div>
                        {session.current ? (
                          <span className="text-xs text-primary-light">Current</span>
                        ) : (
                          <button className="text-xs text-error hover:underline">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <SectionHeader icon={<Shield size={20} />} title="Security" description="Manage access control and permissions" />
                <div className="glass-card rounded-xl divide-y divide-outline-variant">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Fingerprint className="text-primary-light" size={20} />
                      <div>
                        <p className="font-medium text-on-background">Role-Based Access</p>
                        <p className="text-xs text-on-surface-muted">Current role: {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}</p>
                      </div>
                    </div>
                    <select
                      value={profile.role}
                      onChange={(e) => setProfile({...profile, role: e.target.value as UserProfile['role']})}
                      className="input-primary py-2 px-3 text-sm w-40"
                    >
                      <option value="admin">Admin</option>
                      <option value="investigator">Investigator</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>

                  <div className="p-4">
                    <p className="font-label-bold text-on-background mb-4">Permission Controls</p>
                    <div className="space-y-3">
                      {[
                        { key: 'viewVideo', label: 'View Video', desc: 'Access live feeds and recordings' },
                        { key: 'exportEvidence', label: 'Export Evidence', desc: 'Download video clips and reports' },
                        { key: 'manageCases', label: 'Manage Cases', desc: 'Create and edit investigation cases' },
                      ].map((perm) => (
                        <div key={perm.key} className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-on-background">{perm.label}</p>
                            <p className="text-xs text-on-surface-muted">{perm.desc}</p>
                          </div>
                          <ToggleSwitch
                            value={permissions[perm.key as keyof typeof permissions]}
                            onChange={(val) => setPermissions({...permissions, [perm.key]: val})}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Fingerprint className="text-primary-light" size={20} />
                      <div>
                        <p className="font-medium text-on-background">Biometric Lock</p>
                        <p className="text-xs text-on-surface-muted">Retinal and Thumbprint enabled</p>
                      </div>
                    </div>
                    <ToggleSwitch value={biometricLock} onChange={setBiometricLock} />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Shield className="text-primary-light" size={20} />
                      <div>
                        <p className="font-medium text-on-background">Two-Factor Auth</p>
                        <p className="text-xs text-on-surface-muted">Encrypted Satellite Link</p>
                      </div>
                    </div>
                    <ToggleSwitch value={twoFactor} onChange={setTwoFactor} />
                  </div>

                  <div className="p-4">
                    <p className="font-label-bold text-on-background mb-4">Activity Logs</p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {[
                        { action: 'Login from Chrome - Windows 11', time: '2024-04-27 02:14:55', type: 'login' },
                        { action: 'Search: "unauthorized vehicle"', time: '2024-04-27 02:08:12', type: 'search' },
                        { action: 'Video analysis completed', time: '2024-04-27 01:55:00', type: 'analysis' },
                        { action: 'Alert dismissed: Thermal Spike', time: '2024-04-27 01:42:15', type: 'alert' },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${
                            log.type === 'login' ? 'bg-green-400' :
                            log.type === 'search' ? 'bg-primary-light' :
                            log.type === 'analysis' ? 'bg-tertiary' : 'bg-error'
                          }`}></div>
                          <span className="flex-1 text-on-background">{log.action}</span>
                          <span className="text-xs text-on-surface-muted font-mono-data">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Detection Section */}
            {activeTab === 'ai-detection' && (
              <div className="space-y-6">
                <SectionHeader icon={<Brain size={20} />} title="AI Detection" description="Configure detection algorithms and sensitivity" />
                <div className="glass-card rounded-xl p-6 space-y-6">
                  <div>
                    <p className="font-label-bold text-on-background mb-4">Detection Types</p>
                    <div className="space-y-3">
                      {[
                        { key: 'people', label: 'People', desc: 'Detect and track human subjects' },
                        { key: 'vehicles', label: 'Vehicles', desc: 'Identify cars, trucks, and motorcycles' },
                        { key: 'objects', label: 'Objects', desc: 'Detect packages, weapons, and items' },
                      ].map((type) => (
                        <div key={type.key} className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                          <div className="flex items-center gap-3">
                            <Video className="text-primary-light" size={18} />
                            <div>
                              <p className="text-sm font-medium text-on-background">{type.label}</p>
                              <p className="text-xs text-on-surface-muted">{type.desc}</p>
                            </div>
                          </div>
                          <ToggleSwitch
                            value={detectionTypes[type.key as keyof typeof detectionTypes]}
                            onChange={(val) => setDetectionTypes({...detectionTypes, [type.key]: val})}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <p className="font-label-bold text-on-background mb-4">Confidence Threshold</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-on-surface-muted">Current: {Math.round(confidenceThreshold * 100)}%</span>
                        <span className="text-primary-light font-mono-data">{confidenceThreshold.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="0.95"
                        step="0.05"
                        value={confidenceThreshold}
                        onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                        className="w-full accent-primary-light"
                      />
                      <div className="flex justify-between text-xs text-on-surface-muted">
                        <span>0.50 (Lenient)</span>
                        <span>0.95 (Strict)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <p className="font-label-bold text-on-background mb-4">Event Rules</p>
                    <div className="space-y-4">
                      <div className="p-3 bg-surface-container rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-on-background">Loitering Duration</p>
                          <span className="text-xs text-primary-light font-mono-data">{loiteringDuration} min</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={loiteringDuration}
                          onChange={(e) => setLoiteringDuration(parseInt(e.target.value))}
                          className="w-full accent-primary-light"
                        />
                        <p className="text-xs text-on-surface-muted mt-1">Flag subjects stationary for more than {loiteringDuration} minutes</p>
                      </div>
                      <div className="p-3 bg-surface-container rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-on-background">Motion Sensitivity</p>
                          <span className="text-xs text-primary-light font-mono-data">{motionSensitivity}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={motionSensitivity}
                          onChange={(e) => setMotionSensitivity(parseInt(e.target.value))}
                          className="w-full accent-primary-light"
                        />
                        <p className="text-xs text-on-surface-muted mt-1">Trigger on {motionSensitivity}% pixel change</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Section */}
            {activeTab === 'search' && (
              <div className="space-y-6">
                <SectionHeader icon={<Search size={20} />} title="Search" description="Configure default search behavior" />
                <div className="glass-card rounded-xl p-6 space-y-6">
                  <div>
                    <p className="font-label-bold text-on-background mb-4">Default Filters</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Time Range</label>
                        <select
                          value={defaultTimeRange}
                          onChange={(e) => setDefaultTimeRange(e.target.value)}
                          className="input-primary py-2 px-3 text-sm"
                        >
                          <option value="1h">Last 1 Hour</option>
                          <option value="24h">Last 24 Hours</option>
                          <option value="7d">Last 7 Days</option>
                          <option value="30d">Last 30 Days</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Object Type</label>
                        <select
                          value={defaultObjectType}
                          onChange={(e) => setDefaultObjectType(e.target.value)}
                          className="input-primary py-2 px-3 text-sm"
                        >
                          <option value="all">All Types</option>
                          <option value="person">Person</option>
                          <option value="vehicle">Vehicle</option>
                          <option value="object">Object</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <p className="font-label-bold text-on-background mb-4">Search Mode</p>
                    <div className="flex gap-3">
                      {['exact', 'fuzzy'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setSearchMode(mode as 'exact' | 'fuzzy')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            searchMode === mode
                              ? 'bg-primary-light text-white'
                              : 'bg-surface-container text-on-surface-muted hover:text-on-background'
                          }`}
                        >
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-on-surface-muted mt-2">
                      {searchMode === 'exact' ? 'Exact matching requires identical terms' : 'Fuzzy matching allows partial and similar matches'}
                    </p>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Result Limit</label>
                      <input
                        type="number"
                        value={resultLimit}
                        onChange={(e) => setResultLimit(parseInt(e.target.value))}
                        min="10"
                        max="500"
                        className="input-primary w-32"
                      />
                      <p className="text-xs text-on-surface-muted">Maximum number of search results to display</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alerts Section */}
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <SectionHeader icon={<Bell size={20} />} title="Alerts" description="Manage alert rules and notification channels" />
                <div className="glass-card rounded-xl p-6 space-y-6">
                  <div>
                    <p className="font-label-bold text-on-background mb-4">Alert Rules</p>
                    <div className="space-y-3">
                      {alertRules.map((rule) => (
                        <div key={rule.id} className={`p-4 rounded-lg border-l-4 ${
                          rule.severity === 'high' ? 'border-error bg-error/5' :
                          rule.severity === 'medium' ? 'border-error-medium bg-error-medium/5' :
                          'border-error-low bg-error-low/5'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <AlertTriangle className={`${
                                rule.severity === 'high' ? 'text-error' :
                                rule.severity === 'medium' ? 'text-error-medium' : 'text-error-low'
                              }`} size={18} />
                              <span className="font-medium text-on-background">{rule.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                rule.severity === 'high' ? 'bg-error/20 text-error' :
                                rule.severity === 'medium' ? 'bg-error-medium/20 text-error-medium' :
                                'bg-error-low/20 text-error-low'
                              }`}>
                                {rule.severity}
                              </span>
                            </div>
                            <button className="text-error hover:text-error/80">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex gap-4 text-xs">
                            <label className="flex items-center gap-2 text-on-surface-muted">
                              <input
                                type="checkbox"
                                checked={rule.channels.inApp}
                                className="accent-primary-light"
                                readOnly
                              />
                              In-App
                            </label>
                            <label className="flex items-center gap-2 text-on-surface-muted">
                              <input
                                type="checkbox"
                                checked={rule.channels.email}
                                className="accent-primary-light"
                                readOnly
                              />
                              Email
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <p className="font-label-bold text-on-background mb-4">Create New Rule</p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Rule Name</label>
                        <input
                          type="text"
                          value={newRuleName}
                          onChange={(e) => setNewRuleName(e.target.value)}
                          placeholder="e.g., Unauthorized Access"
                          className="input-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Severity Level</label>
                        <div className="flex gap-3">
                          {(['low', 'medium', 'high'] as const).map((sev) => (
                            <button
                              key={sev}
                              onClick={() => setNewRuleSeverity(sev)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                newRuleSeverity === sev
                                  ? sev === 'high' ? 'bg-error/20 text-error border border-error/30' :
                                    sev === 'medium' ? 'bg-error-medium/20 text-error-medium border border-error-medium/30' :
                                    'bg-error-low/20 text-error-low border border-error-low/30'
                                  : 'bg-surface-container text-on-surface-muted hover:text-on-background'
                              }`}
                            >
                              {sev.charAt(0).toUpperCase() + sev.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button className="btn-primary text-sm py-2 px-6">
                        <Save size={14} /> Add Rule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Voice Section */}
            {activeTab === 'voice' && (
              <div className="space-y-6">
                <SectionHeader icon={<Mic size={20} />} title="OmniVoice" description="Configure voice control settings" />
                <div className="glass-card rounded-xl divide-y divide-outline-variant">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Mic className="text-primary-light" size={20} />
                      <div>
                        <p className="font-medium text-on-background">Voice Control</p>
                        <p className="text-xs text-on-surface-muted">Enable/disable voice commands</p>
                      </div>
                    </div>
                    <ToggleSwitch value={voiceEnabled} onChange={setVoiceEnabled} />
                  </div>

                  {voiceEnabled && (
                    <>
                      <div className="p-4 space-y-2">
                        <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Language</label>
                        <select
                          value={voiceLanguage}
                          onChange={(e) => setVoiceLanguage(e.target.value)}
                          className="input-primary py-2 px-3 text-sm w-full"
                        >
                          <option value="en-US">English (US)</option>
                          <option value="en-GB">English (UK)</option>
                          <option value="es-ES">Spanish</option>
                          <option value="fr-FR">French</option>
                        </select>
                      </div>

                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Mic className="text-primary-light" size={20} />
                          <div>
                            <p className="font-medium text-on-background">Microphone Permission</p>
                            <p className="text-xs text-on-surface-muted">Allow access to microphone</p>
                          </div>
                        </div>
                        <ToggleSwitch value={micPermission} onChange={setMicPermission} />
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Command Sensitivity</p>
                          <span className="text-xs text-primary-light font-mono-data">{commandSensitivity}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={commandSensitivity}
                          onChange={(e) => setCommandSensitivity(parseInt(e.target.value))}
                          className="w-full accent-primary-light"
                        />
                        <p className="text-xs text-on-surface-muted">Higher sensitivity detects quieter commands</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Cases Section */}
            {activeTab === 'cases' && (
              <div className="space-y-6">
                <SectionHeader icon={<FolderOpen size={20} />} title="Cases & Evidence" description="Configure case management and evidence handling" />
                <div className="glass-card rounded-xl p-6 space-y-6">
                  <div>
                    <p className="font-label-bold text-on-background mb-4">Default Case Settings</p>
                    <div className="space-y-3">
                      {[
                        { key: 'autoSave', label: 'Auto-Save Detected Events', desc: 'Automatically add detections to active case' },
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-on-background">{setting.label}</p>
                            <p className="text-xs text-on-surface-muted">{setting.desc}</p>
                          </div>
                          <ToggleSwitch
                            value={defaultCaseSettings.autoSave}
                            onChange={(val) => setDefaultCaseSettings({...defaultCaseSettings, autoSave: val})}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <p className="font-label-bold text-on-background mb-4">Export Options</p>
                    <div className="space-y-3">
                      {[
                        { key: 'exportVideo', label: 'Video Clips', desc: 'Include video clips in exports' },
                        { key: 'exportReports', label: 'Reports', desc: 'Generate PDF reports with analysis' },
                      ].map((option) => (
                        <div key={option.key} className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-on-background">{option.label}</p>
                            <p className="text-xs text-on-surface-muted">{option.desc}</p>
                          </div>
                          <ToggleSwitch
                            value={defaultCaseSettings[option.key as keyof typeof defaultCaseSettings]}
                            onChange={(val) => setDefaultCaseSettings({...defaultCaseSettings, [option.key]: val})}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Storage Section */}
            {activeTab === 'storage' && (
              <div className="space-y-6">
                <SectionHeader icon={<Database size={20} />} title="Storage" description="Manage data retention and archive policies" />
                <div className="glass-card rounded-xl p-6 space-y-6">
                  <div>
                    <p className="font-label-bold text-on-background mb-4">Storage Usage</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono-data">
                        <span className="text-primary-light">CLOUD_CAPACITY</span>
                        <span className="text-on-surface-muted">{storageUsed.used} GB / {storageUsed.total} GB</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary-light rounded-full" style={{ width: `${(storageUsed.used / storageUsed.total) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-on-surface-muted">{(storageUsed.total - storageUsed.used).toFixed(0)} GB available</p>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Video/Data Retention</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={retentionPeriod}
                          onChange={(e) => setRetentionPeriod(parseInt(e.target.value))}
                          min="1"
                          max="365"
                          className="input-primary w-20"
                        />
                        <span className="text-sm text-on-surface-muted">days</span>
                      </div>
                      <p className="text-xs text-on-surface-muted">Data older than {retentionPeriod} days will be archived</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">Archive After</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={archiveAfter}
                          onChange={(e) => setArchiveAfter(parseInt(e.target.value))}
                          min="1"
                          max="30"
                          className="input-primary w-20"
                        />
                        <span className="text-sm text-on-surface-muted">days</span>
                      </div>
                      <p className="text-xs text-on-surface-muted">Move to cold storage after {archiveAfter} days</p>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg hover:bg-surface-container-highest transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Trash2 className="text-primary-light" size={20} />
                        <div>
                          <p className="font-medium text-on-background">Auto-Delete Logs</p>
                          <p className="text-xs text-on-surface-muted">Clear cycles every {retentionPeriod} days</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-on-surface-muted/40" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Section */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <SectionHeader icon={<Palette size={20} />} title="Appearance" description="Customize the look and feel" />
                <div className="glass-card rounded-xl divide-y divide-outline-variant">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        theme === 'dark' ? 'bg-slate-900' : 'bg-white border border-slate-200'
                      }`}>
                        {theme === 'dark' ? <Moon size={16} className="text-white" /> : <Sun size={16} className="text-slate-900" />}
                      </div>
                      <div>
                        <p className="font-medium text-on-background">Theme</p>
                        <p className="text-xs text-on-surface-muted">Current: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                      </div>
                    </div>
                    <button onClick={toggleTheme} className="btn-secondary text-sm py-2 px-4">
                      Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <label className="text-sm font-medium text-on-surface-muted uppercase tracking-wider">UI Density</label>
                    <div className="flex gap-3">
                      {(['comfortable', 'compact'] as const).map((density) => (
                        <button
                          key={density}
                          onClick={() => setUiDensity(density)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            uiDensity === density
                              ? 'bg-primary-light text-white'
                              : 'bg-surface-container text-on-surface-muted hover:text-on-background'
                          }`}
                        >
                          {density.charAt(0).toUpperCase() + density.slice(1)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-on-surface-muted mt-1">
                      {uiDensity === 'comfortable' ? 'More spacing, larger elements' : 'Compact layout, smaller elements'}
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="font-label-bold text-on-background mb-4">Accent Color</p>
                    <div className="flex gap-3">
                      {[
                        { color: '#1E3A8A', name: 'Deep Blue' },
                        { color: '#0EA5E9', name: 'Sky Blue' },
                        { color: '#06B6D4', name: 'Cyan' },
                      ].map((accent) => (
                        <button
                          key={accent.name}
                          className="w-10 h-10 rounded-full border-2 border-white/20 hover:scale-110 transition-transform"
                          style={{ backgroundColor: accent.color }}
                          title={accent.name}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Section */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <SectionHeader icon={<Webhook size={20} />} title="Integrations" description="Manage external connections and API access" />
                <div className="glass-card rounded-xl p-6 space-y-6">
                  <div>
                    <p className="font-label-bold text-on-background mb-4">API Keys</p>
                    <div className="space-y-3">
                      {[
                        { key: 'vision', label: 'Vision API', value: apiKeys.vision },
                        { key: 'analytics', label: 'Analytics API', value: apiKeys.analytics },
                      ].map((api) => (
                        <div key={api.key} className="p-3 bg-surface-container rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-on-background">{api.label}</p>
                            <button className="text-xs text-primary-light hover:underline">Regenerate</button>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 bg-surface px-3 py-2 rounded text-xs font-mono-data text-on-surface-muted">
                              {api.value}
                            </code>
                            <button className="p-2 hover:text-primary-light transition-colors" title="Copy">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <p className="font-label-bold text-on-background mb-4">Webhook URL</p>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="https://your-system.com/webhook"
                        className="input-primary flex-1"
                      />
                      <button className="btn-primary text-sm py-2 px-4">
                        <Save size={14} /> Connect
                      </button>
                    </div>
                    <p className="text-xs text-on-surface-muted mt-2">Receive real-time events at this endpoint</p>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <p className="font-label-bold text-on-background mb-4">External Systems</p>
                    <div className="space-y-3">
                      {[
                        { name: 'Law Enforcement DB', connected: true },
                        { name: 'Emergency Dispatch', connected: false },
                        { name: 'Cloud Storage', connected: true },
                      ].map((system, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                          <div className="flex items-center gap-3">
                            <Globe className="text-primary-light" size={18} />
                            <span className="text-sm font-medium text-on-background">{system.name}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            system.connected
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-on-surface-muted/20 text-on-surface-muted'
                          }`}>
                            {system.connected ? 'Connected' : 'Not Connected'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* System Action */}
        <div className="pt-8 pb-12">
          <button className="w-full bg-error/10 border-2 border-error/50 text-error py-4 font-label-bold uppercase tracking-widest hover:bg-error hover:text-white transition-all flex items-center justify-center gap-3 rounded-lg group">
            <Power size={20} className="group-hover:animate-pulse" />
            System Shutdown
          </button>
          <p className="text-center text-[10px] font-mono-data text-on-surface-muted mt-4 uppercase tracking-tighter">
            Warning: Shutdown will terminate all active surveillance nodes
          </p>
        </div>
      </main>
    </AppLayout>
  )
}

function SectionHeader({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-center gap-3 pb-2 border-b border-outline-variant">
      <div className="p-2 bg-primary/20 rounded-lg text-primary-light">
        {icon}
      </div>
      <div>
        <h3 className="font-headline-md text-on-background">{title}</h3>
        <p className="text-sm text-on-surface-muted">{description}</p>
      </div>
    </div>
  )
}

function ToggleSwitch({ value, onChange }: { value: boolean; onChange: (val: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full border flex items-center px-1 transition-all ${
        value
          ? 'bg-primary/20 border-primary-light/30'
          : 'bg-surface-container border-outline-variant'
      }`}
    >
      <div className={`w-4 h-4 rounded-sm transition-transform ${
        value ? 'bg-primary-light translate-x-6' : 'bg-on-surface-muted'
      }`}></div>
    </button>
  )
}


