import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Account created:', formData);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md overflow-x-hidden">
      {/* Tech Pattern Background */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-10">
        <div className="absolute top-1/4 left-10 w-64 h-64 border border-primary-light/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-primary-light/10 rounded-full"></div>
      </div>

      {/* Blur Accents */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-tertiary/5 blur-[100px] pointer-events-none -z-10"></div>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/80 backdrop-blur-lg border-b border-outline-variant shadow-lg">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-light" />
          </div>
          <h1 className="font-display tracking-widest font-bold uppercase text-primary-light group-hover:text-primary-light/80 transition-colors">iCamAutopsy</h1>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 pt-20 pb-12">
        <div className="w-full max-w-[480px] z-10">
          {/* Hero Identity */}
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary-light/20 mb-4">
              <Zap className="w-8 h-8 text-primary-light" />
            </div>
            <h2 className="font-headline-lg text-4xl font-bold text-on-background">Create Account</h2>
            <p className="text-body-md text-on-surface-muted">Join iCamAutopsy today</p>
          </div>

          {/* Signup Card */}
          <div className="glass-card p-8 rounded-xl relative">
            {/* AI Pulse Decorative Element */}
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-primary-light to-transparent shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Input Email */}
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-muted block uppercase tracking-wider ml-1 font-semibold" htmlFor="email">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted w-5 h-5 group-focus-within:text-primary-light transition-colors" />
                  <input
                    className="input-primary pl-12"
                    id="email"
                    placeholder="agent@icamautopsy.ai"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-muted block uppercase tracking-wider ml-1 font-semibold" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted w-5 h-5 group-focus-within:text-primary-light transition-colors" />
                  <input
                    className="input-primary pl-12 pr-12"
                    id="password"
                    placeholder="••••••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-muted hover:text-on-background transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-muted block uppercase tracking-wider ml-1 font-semibold" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted w-5 h-5 group-focus-within:text-primary-light transition-colors" />
                  <input
                    className="input-primary pl-12 pr-12"
                    id="confirmPassword"
                    placeholder="••••••••••••"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-muted hover:text-on-background transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Creating Account...' : 'Get Started'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-label-sm uppercase">
                <span className="bg-surface px-4 text-on-surface-muted font-label-sm">External Authentication</span>
              </div>
            </div>

            {/* Social Signups */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container border border-outline-variant hover:bg-surface-container-highest hover:border-primary-light/30 transition-colors rounded-lg group">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-label-sm text-on-surface group-hover:text-primary-light transition-colors">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container border border-outline-variant hover:bg-surface-container-highest hover:border-primary-light/30 transition-colors rounded-lg group">
                <svg className="w-5 h-5 fill-on-surface group-hover:fill-primary-light transition-colors" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.96.95-2.18 1.78-3.6 1.78-1.5 0-2.1-.96-3.8-.96-1.6 0-2.3.94-3.8.94-1.3 0-2.6-.9-3.6-2.2-2.1-2.7-2.1-7.1 0-9.8 1-1.3 2.3-2.1 3.7-2.1 1.4 0 2.2.9 3.2.9s1.8-.9 3.3-.9c1.2 0 2.4.6 3.2 1.5-2.8 1.6-2.4 5.7.4 7.1-.5 1.2-1.3 2.3-2.4 3.3zm-3.7-13.5c-.4-1.3-1.3-2.4-2.5-2.7 0 2 1.5 3.6 2.5 3.6.1.9.5 1.7 1 2.3.4-2.8-.3-3-1.4-.2 1.7 1.3 3.4 3 3.4.5-1.4.6-2.8.5-4.2-1-1-.5-2.8-.5-2.8z" />
                </svg>
                <span className="text-label-sm text-on-surface group-hover:text-primary-light transition-colors">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-body-md text-on-surface-muted">Secure access only.</p>

            {/* Login Link */}
            <p className="mt-6 text-center text-body-md text-on-surface-muted">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary-light hover:text-primary-light/80 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>

          {/* Footer Decorative */}
          <div className="mt-12 flex justify-center items-center gap-6 opacity-40">
            <div className="h-px w-12 bg-outline-variant"></div>
            <div className="text-xs font-label-sm tracking-[0.2em] text-on-surface-muted uppercase">Neural Core V4.2</div>
            <div className="h-px w-12 bg-outline-variant"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
