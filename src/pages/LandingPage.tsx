import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Zap, Eye, Globe, Menu, X,
  Fingerprint, BarChart3, Lock, Database, Users, Server,
  ChevronRight
} from 'lucide-react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Handle hash fragment scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.hash])

  const navItems = [
    { label: 'Capabilities', href: '/#oversight' },
    { label: 'Security', href: '/#security' },
    { label: 'Privacy', href: '/#privacy' },
    { label: 'Docs', href: '/#docs' },
  ]

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md overflow-x-hidden">
      {/* TopNavBar */}
      <nav className={`fixed top-0 w-full z-50 border-b border-outline-variant transition-all duration-300 ${scrolled ? 'bg-surface/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center h-20 px-8 w-full max-w-screen-2xl mx-auto">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-primary-light drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] font-display">
            iCamAutopsy
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-display text-sm tracking-widest uppercase transition-all duration-300 pb-1 ${i === 0 ? 'text-primary-light border-b-2 border-primary-light' : 'text-on-surface-muted hover:text-on-background hover:border-b-2 hover:border-primary-light/30'}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/signup"
              className="hidden sm:block bg-primary text-white px-6 py-2 font-display text-sm tracking-widest uppercase font-bold hover:bg-primary-light hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 rounded-lg"
            >
              Get Started
            </Link>
            <button
              className="md:hidden text-on-background p-2 hover:text-primary-light transition-colors rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-outline-variant px-8 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block font-display text-sm tracking-widest uppercase text-on-surface-muted hover:text-primary-light transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#signup"
              className="block bg-primary text-white px-6 py-3 font-display text-sm tracking-widest uppercase font-bold rounded-lg text-center mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="High-tech surveillance camera"
            className="w-full h-full object-cover opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRA4Fv7Av-HU75IHTASyKIjA_rCME7EkeGchM0VXfNQzvMly3Vh8jIqPPeU5y3tpHXFjvZwiYXfCdi1olMUHechLUXpemTLHztd9dBmTLGuCl51TOX9CRROn2m64CvXRJz17JEe5tpU2gvrPyjqs7qNlRN0LKcvoH7sKEP19GAaM-LoV5d1cgLDfvMPOjRlpsoy_QJcmVh4wfn0mPnaShmHbPtjyFF9fC7R5JwkM1KlNW4EwYq89tVLTa7PocFyQJZrz5e9VjrNOA"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary-light/30 bg-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse"></span>
              <span className="font-label-caps text-primary-light uppercase text-[10px]">System Status: Fully Operational</span>
            </div>
            <h1 className="font-display text-6xl lg:text-8xl leading-tight text-on-background font-bold tracking-tight">
              AI-Powered Security for the <span className="text-gradient">Modern World.</span>
            </h1>
            <p className="font-body-lg text-on-surface-muted max-w-lg">
              The next evolution of institutional vigilance. iCamAutopsy integrates neural behavioral mapping with instant protocol deployment to secure what matters most.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/signup" className="bg-primary text-white px-10 py-4 font-label-caps uppercase text-sm tracking-widest font-bold hover:bg-primary-light hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 rounded-lg">
                Deploy Protocol
              </Link>
              <Link to="/signin" className="border border-outline-variant bg-surface-container text-on-background px-10 py-4 font-label-caps uppercase text-sm tracking-widest font-bold hover:bg-surface-container-highest hover:border-primary-light/30 transition-all duration-300 rounded-lg">
                View Specs
              </Link>
            </div>
          </div>
          {/* Bento Stats Panel */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center space-y-3 hover:border-primary-light/30 hover:scale-[1.02] transition-all duration-300 min-h-[140px]">
              <Shield className="text-primary-light text-3xl" />
              <h3 className="font-display text-2xl font-semibold text-on-background">99.99%</h3>
              <p className="text-on-surface-muted font-label-caps text-[10px]">Threat Mitigation</p>
            </div>
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center space-y-3 hover:border-primary-light/30 hover:scale-[1.02] transition-all duration-300 min-h-[140px]">
              <Zap className="text-primary-light text-3xl" />
              <h3 className="font-display text-2xl font-semibold text-on-background">0.03ms</h3>
              <p className="text-on-surface-muted font-label-caps text-[10px]">Response Latency</p>
            </div>
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center space-y-3 hover:border-primary-light/30 hover:scale-[1.02] transition-all duration-300 min-h-[140px]">
              <Globe className="text-primary-light text-3xl" />
              <h3 className="font-display text-2xl font-semibold text-on-background">10M+</h3>
              <p className="text-on-surface-muted font-label-caps text-[10px]">Active Nodes</p>
            </div>
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center space-y-3 hover:border-primary-light/30 hover:scale-[1.02] transition-all duration-300 min-h-[140px]">
              <Eye className="text-primary-light text-3xl" />
              <h3 className="font-display text-2xl font-semibold text-on-background">4K UHD</h3>
              <p className="text-on-surface-muted font-label-caps text-[10px]">Real-time Processing</p>
            </div>
          </div>
        </div>
      </section>

       {/* Capabilities Grid */}
       <section id="oversight" className="py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16 text-center">
            <h2 className="font-headline-lg mb-4 text-on-background">Elite Oversight Capabilities</h2>
            <div className="h-1 w-24 bg-primary-light mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CapabilityCard
              icon={<Shield className="text-primary-light text-4xl" />}
              title="Autonomous Behavioral Analysis"
              description="Advanced neural networks predict intent through complex motion pattern recognition, identifying anomalies before they manifest as threats."
              features={['Pattern Recognition', 'Intent Prediction', 'Crowd Dynamics']}
              offset=""
            />
            <CapabilityCard
              icon={<Zap className="text-primary-light text-4xl" />}
              title="Instant Threat Protocol"
              description="Automated lockdown and emergency response triggers. Seamless integration with local law enforcement and private security systems."
              features={['Smart Lockout', 'Signal Jamming', 'Rapid Dispatch']}
              offset="md:translate-y-8"
            />
            <CapabilityCard
              icon={<Eye className="text-primary-light text-4xl" />}
              title="Ultra-HD Low Light"
              description="Proprietary sensor technology provides full-spectrum visibility in total darkness, rendered in crisp 4K resolution with AI color restoration."
              features={['0.001 Lux Sensitivity', 'Neural Enhancement', 'Thermal Overlay']}
              offset=""
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-lg text-primary-light">
                <Lock size={20} />
              </div>
              <h2 className="font-headline-lg text-on-background">Security & Data Protection</h2>
            </div>
            <div className="h-1 w-24 bg-primary-light"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SecurityCard
              icon={<Lock className="text-primary-light" size={24} />}
              title="Data Protection"
              description="All video feeds and metadata are encrypted at rest using AES-256 encryption. End-to-end TLS 1.3 secures all data in transit between nodes and command centers."
            />
            <SecurityCard
              icon={<Shield className="text-primary-light" size={24} />}
              title="Secure Access"
              description="Multi-factor authentication with biometric verification ensures only authorized personnel can access sensitive surveillance data and controls."
            />
            <SecurityCard
              icon={<Database className="text-primary-light" size={24} />}
              title="Encrypted Storage"
              description="Distributed storage architecture with automatic encryption key rotation. Data is fragmented and replicated across secure, geographically separated nodes."
            />
            <SecurityCard
              icon={<Users className="text-primary-light" size={24} />}
              title="Access Control"
              description="Role-based permissions restrict data access. Admins, investigators, and viewers have strictly scoped access to sensitive information and system controls."
            />
            <SecurityCard
              icon={<Server className="text-primary-light" size={24} />}
              title="System Reliability"
              description="99.99% uptime with redundant failover systems. Continuous monitoring and automated health checks ensure uninterrupted surveillance coverage."
            />
            <SecurityCard
              icon={<Fingerprint className="text-primary-light" size={24} />}
              title="Privacy Compliance"
              description="Built with privacy-by-design principles. GDPR and CCPA compliant data handling with full audit trails and user data control options."
            />
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy" className="py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <h2 className="font-headline-lg mb-4 text-on-background">Privacy Policy</h2>
            <div className="h-1 w-24 bg-primary-light"></div>
          </div>
          <div className="glass-card rounded-xl p-8 space-y-6">
            <div>
              <h3 className="font-headline-md text-on-background mb-3">Data Collection & Use</h3>
              <p className="text-on-surface-muted font-body-md leading-relaxed">
                iCamAutopsy collects only the minimum data necessary to provide security services. This includes video feeds, detection metadata, user credentials, and system logs. Data is processed locally when possible and never sold to third parties.
              </p>
            </div>
            <div className="h-px bg-outline-variant"></div>
            <div>
              <h3 className="font-headline-md text-on-background mb-3">Your Data Controls</h3>
              <p className="text-on-surface-muted font-body-md leading-relaxed">
                Users have full control over their data. You can export, modify, or delete your data at any time through the Settings panel. Retention periods are configurable, and all deletion requests are processed within 30 days.
              </p>
            </div>
            <div className="h-px bg-outline-variant"></div>
            <div>
              <h3 className="font-headline-md text-on-background mb-3">Information We Collect</h3>
              <ul className="space-y-2 text-on-surface-muted">
                {[
                  'Video feeds and captured frames from connected cameras',
                  'AI detection results and confidence scores',
                  'User account information and authentication data',
                  'System access logs and audit trails',
                  'Configuration and preference settings',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-light mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation / FAQs */}
      <section id="docs" className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16 text-center">
            <h2 className="font-headline-lg mb-4 text-on-background">Documentation & FAQs</h2>
            <div className="h-1 w-24 bg-primary-light mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How does iCamAutopsy detect threats?',
                a: 'Our neural networks analyze video feeds in real-time, identifying people, vehicles, and objects. Advanced behavioral analysis predicts suspicious activity before incidents occur, with configurable confidence thresholds.'
              },
              {
                q: 'What video formats are supported?',
                a: 'iCamAutopsy supports all major video formats including MP4, AVI, MOV, and MKV. Streams from RTSP, RTMP, and HLS protocols are also supported for live feed integration.'
              },
              {
                q: 'How is my data kept secure?',
                a: 'All data is encrypted at rest with AES-256 and in transit with TLS 1.3. Our distributed architecture ensures no single point of failure, with automatic backups and geographically separated storage nodes.'
              },
              {
                q: 'Can I integrate with existing systems?',
                a: 'Yes, iCamAutopsy provides REST APIs and webhooks for seamless integration with law enforcement databases, emergency dispatch systems, and third-party security platforms.'
              },
              {
                q: 'What are the system requirements?',
                a: 'iCamAutopsy runs on standard x86 servers with NVIDIA GPU acceleration recommended. Minimum 16GB RAM, 4-core CPU, and 500GB storage per 10 camera nodes. Cloud deployment options are also available.'
              },
              {
                q: 'How do I get started?',
                a: 'Create an account, configure your camera nodes, set your detection preferences, and start monitoring. Our onboarding team provides full support during initial deployment and integration.'
              },
            ].map((faq, i) => (
              <div key={i} className="glass-card rounded-xl p-6 hover:border-primary-light/30 transition-all">
                <h4 className="font-label-bold text-on-background mb-3 flex items-start gap-2">
                  <ChevronRight size={16} className="text-primary-light mt-1 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-on-surface-muted text-sm pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Command Center Preview */}
      <section id="command-center" className="py-32 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1 relative">
              <div className="glass-card p-2 rounded-2xl overflow-hidden border border-outline-variant">
                <img
                  alt="AI Dashboard Interface"
                  className="w-full h-auto rounded-xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMpVvQBdwYq8VUiEBP95WfEnjjW_7U0Cdx9zdJMkSESxSL3LhEhTHVxlPJpgBwJ_kDpP9i9tBvmQPTF6CYfmSnbXCI9gyHB98AGtAFGuxf7_9nWzYpD7uOGYb8QGWQnlZuqGyzeUch6XbjQ-LiaptUvNV4TZGPRPrHUb9Nqaac-P4_idjsJnOV0MyvxKPr5EzSAMTes7jPInfnLAKE2BqBogRb3wlNdTzKYtKPz3wNOKAxZGQOQ4JQ0-2-cjnVweejcOh0KV2xTEg"
                />
                <div className="absolute top-10 -right-8 glass-card p-4 rounded-lg hidden md:block border border-outline-variant">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                      <Shield className="text-green-500 text-sm" />
                    </div>
                    <div>
                      <p className="text-[10px] font-label-caps">Zone 04 Secure</p>
                      <p className="text-[8px] text-on-surface-muted">No anomalies detected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-6">
              <h2 className="font-headline-lg text-5xl text-on-background">The Central Nervous System of Your Infrastructure</h2>
              <p className="font-body-lg text-on-surface-muted">
                Our Command Center interface offers a unified view of your entire security ecosystem. From individual biometric scanning to global node status, total control is at your fingertips.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary-light shrink-0">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-on-background">Predictive Analytics Hub</p>
                    <p className="text-on-surface-muted text-sm">Visualize potential vulnerabilities before they are exploited.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary-light shrink-0">
                    <Fingerprint size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-on-background">Neural Identity Verification</p>
                    <p className="text-on-surface-muted text-sm">Multi-modal biometric authentication for absolute entry control.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secure Your Assets CTA */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-8">
          <div className="glass-card rounded-[32px] p-16 relative overflow-hidden border-2 border-primary-light/20">
            <div className="relative z-10 text-center space-y-8">
              <h2 className="font-display text-5xl font-bold text-on-background">Secure Your Assets</h2>
              <p className="text-on-surface-muted font-body-lg max-w-2xl mx-auto">
                Join the elite organizations worldwide that trust iCamAutopsy for their institutional vigilance and operational continuity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="bg-primary text-white px-12 py-5 rounded-lg font-label-caps text-sm tracking-[0.2em] font-bold hover:bg-primary-light hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                  REQUEST NODE ACCESS
                </Link>
                <Link to="/signin" className="bg-surface-container border border-outline-variant text-on-background px-12 py-5 rounded-lg font-label-caps text-sm tracking-[0.2em] font-bold hover:bg-surface-container-highest hover:border-primary-light/30 transition-all">
                  CONSULT SPECIALIST
                </Link>
              </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-light/10 blur-[80px] rounded-full"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-tertiary/10 blur-[80px] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant py-12 bg-surface">
      </footer>
    </div>
  )
}

function CapabilityCard({ icon, title, description, features, offset }: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  offset: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`glass-card p-10 rounded-2xl transition-all duration-500 ${offset} ${hovered ? 'border-primary-light/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center mb-8 transition-all duration-500 ${hovered ? 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' : ''}`}>
        {icon}
      </div>
      <h3 className="font-headline-md text-2xl mb-4 text-on-background">{title}</h3>
      <p className="text-on-surface-muted font-body-md">{description}</p>
      <ul className="mt-8 space-y-3 text-sm text-on-surface-muted font-label-caps">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-light rounded-full"></span> {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SecurityCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="glass-card rounded-xl p-6 hover:border-primary-light/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="font-headline-md text-on-background mb-2">{title}</h3>
      <p className="text-sm text-on-surface-muted leading-relaxed">{description}</p>
    </div>
  )
}
