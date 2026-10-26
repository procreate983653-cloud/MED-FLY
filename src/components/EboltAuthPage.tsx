import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, X, ArrowRight, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { DEMO_PATIENT } from '../data/medicalData';
import { MedFlyLogo } from './MedFlyLogo';

export interface UserSession {
  role: 'patient' | 'doctor';
  name: string;
  email: string;
  details: typeof DEMO_PATIENT | { name: string; title: string; dept: string; id: string };
}

interface EboltAuthPageProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
  currentSession?: UserSession | null;
  onSignOut?: () => void;
  onOpenDashboard?: () => void;
}

export const EboltAuthPage: React.FC<EboltAuthPageProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentSession,
  onSignOut,
  onOpenDashboard,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  if (!isOpen) return null;

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address to continue.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    // Determine role based on email or default to patient
    const isDoctor = email.toLowerCase().includes('doc') || email.toLowerCase().includes('staff') || email.toLowerCase().includes('dr.');
    const userName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    if (isDoctor) {
      onLoginSuccess({
        role: 'doctor',
        name: userName.startsWith('Dr') ? userName : `Dr. ${userName}`,
        email,
        details: {
          name: userName,
          title: 'Attending Staff Clinician',
          dept: 'Clinical Operations',
          id: `DOC-${Math.floor(10000 + Math.random() * 90000)}`,
        },
      });
    } else {
      onLoginSuccess({
        role: 'patient',
        name: userName,
        email,
        details: {
          ...DEMO_PATIENT,
          name: userName,
          email,
        },
      });
    }

    onClose();
  };

  const handleDemoPatient = () => {
    onLoginSuccess({
      role: 'patient',
      name: DEMO_PATIENT.name,
      email: DEMO_PATIENT.email,
      details: DEMO_PATIENT,
    });
    onClose();
  };

  const handleDemoDoctor = () => {
    onLoginSuccess({
      role: 'doctor',
      name: 'Dr. Sarah Jenkins, MD',
      email: 'dr.jenkins@staff.medflyhealth.org',
      details: {
        name: 'Dr. Sarah Jenkins, MD',
        title: 'Chief Tele-Triage Physician',
        dept: 'Emergency Medicine & Triage',
        id: 'DOC-55829',
      },
    });
    onClose();
  };

  const handleSocialSignIn = (provider: 'Google' | 'Facebook' | 'Apple') => {
    setInfoMsg(`Signing in with ${provider}...`);
    setTimeout(() => {
      onLoginSuccess({
        role: 'patient',
        name: `${provider} Verified User`,
        email: `user@${provider.toLowerCase()}.com`,
        details: {
          ...DEMO_PATIENT,
          name: `${provider} Verified User`,
          email: `user@${provider.toLowerCase()}.com`,
        },
      });
      setInfoMsg('');
      onClose();
    }, 700);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setInfoMsg('Please enter your email above and click "Forgot password?" again to receive a password reset link.');
    } else {
      setInfoMsg(`Password reset instructions have been sent to ${email}.`);
    }
    setTimeout(() => setInfoMsg(''), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center min-h-screen bg-gradient-to-b from-[#87bce2] via-[#aed5ee] to-[#deecf5] selection:bg-sky-200">
      {/* Background Decorative Concentric Rings & Soft Cloud Ambiance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Subtle circular ripple arcs */}
        <svg
          className="absolute w-[180vw] h-[180vw] max-w-[1900px] max-h-[1900px] opacity-40 -translate-y-6"
          viewBox="0 0 1000 1000"
          fill="none"
        >
          <circle cx="500" cy="500" r="260" stroke="white" strokeWidth="1" strokeOpacity="0.45" />
          <circle cx="500" cy="500" r="380" stroke="white" strokeWidth="1" strokeOpacity="0.35" />
          <circle cx="500" cy="500" r="500" stroke="white" strokeWidth="1" strokeOpacity="0.25" />
          <circle cx="500" cy="500" r="630" stroke="white" strokeWidth="1" strokeOpacity="0.18" />
          <circle cx="500" cy="500" r="780" stroke="white" strokeWidth="1" strokeOpacity="0.12" />
        </svg>

        {/* Cloud Atmosphere billows across bottom */}
        <div className="absolute -bottom-16 left-0 right-0 h-96 bg-gradient-to-t from-white/95 via-white/60 to-transparent pointer-events-none" />
        <div className="absolute -bottom-8 left-10 w-96 h-56 bg-white/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-20 w-[500px] h-64 bg-white/50 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Left Branding: MedFly Health System with Circle with Wings */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20 flex items-center gap-2.5">
        <MedFlyLogo className="w-9 h-9 drop-shadow-md" />
        <div className="flex flex-col">
          <span className="text-slate-900 font-extrabold text-lg tracking-tight">
            Med<span className="text-blue-600">Fly</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 -mt-1">
            Health System
          </span>
        </div>
      </div>

      {/* Top Right Exit / Return Button */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20 flex items-center gap-2">
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold backdrop-blur-md border border-white/80 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          title="Return to Healthcare Portal"
        >
          <span>Return to Portal</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Glassmorphic Sign-In Card Container */}
      <div className="relative z-10 w-full max-w-[430px] mx-4 my-16">
        <div className="relative p-8 sm:p-9 rounded-[32px] bg-gradient-to-b from-[#e3f1fb]/90 via-[#f4f9fd]/92 to-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_24px_60px_-15px_rgba(50,110,180,0.18)]">
          {/* Top Squircle Icon Button with Arrow-to-Bracket */}
          <div className="flex justify-center -mt-2 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_16px_rgba(100,160,220,0.15)] flex items-center justify-center text-slate-800">
              <svg
                className="w-6 h-6 text-slate-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
          </div>

          {/* Heading and Subtitle */}
          <div className="text-center mb-6">
            <h2 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
              Sign in with email
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-[310px] mx-auto mt-2">
              Make a new doc to bring your words, data, and teams together. For free
            </p>
          </div>

          {/* Currently Logged In 1-Click Logout Banner */}
          {currentSession && (
            <div className="mb-5 p-3.5 bg-white/95 rounded-2xl border border-sky-200/90 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {currentSession.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="truncate">
                  <span className="font-bold text-slate-900 text-xs block truncate">{currentSession.name}</span>
                  <span className="text-[11px] text-blue-700 capitalize font-medium">{currentSession.role} Account</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onSignOut) {
                    onSignOut();
                    setInfoMsg('You have successfully logged out.');
                    setTimeout(() => setInfoMsg(''), 4000);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
                title="Log Out with 1 Click"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}

          {/* Feedback Alerts */}
          {error && (
            <div className="mb-4 p-2.5 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 p-2.5 rounded-xl bg-sky-50/90 border border-sky-200 text-sky-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-sky-600" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleGetStarted} className="space-y-3.5">
            {/* Email Field */}
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full py-3.5 pl-11 pr-4 bg-[#eef3f7] hover:bg-[#e7eef4] focus:bg-white border border-transparent focus:border-sky-300 focus:ring-4 focus:ring-sky-100/60 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full py-3.5 pl-11 pr-11 bg-[#eef3f7] hover:bg-[#e7eef4] focus:bg-white border border-transparent focus:border-sky-300 focus:ring-4 focus:ring-sky-100/60 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end pt-0.5">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* "Get Started" Pill Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-[#1e2026] hover:bg-[#121419] shadow-md shadow-slate-900/10 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
            </button>
          </form>

          {/* "············ Or sign in with ············" Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dotted border-slate-300" />
            </div>
            <span className="relative bg-white/70 backdrop-blur-xs px-3 text-[11px] text-slate-400 font-medium tracking-wide">
              Or sign in with
            </span>
          </div>

          {/* Social Sign-In Buttons (Google, Facebook, Apple) */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialSignIn('Google')}
              className="h-11 rounded-xl bg-white/85 hover:bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Sign in with Google"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => handleSocialSignIn('Facebook')}
              className="h-11 rounded-xl bg-white/85 hover:bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Sign in with Facebook"
            >
              <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => handleSocialSignIn('Apple')}
              className="h-11 rounded-xl bg-white/85 hover:bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Sign in with Apple"
            >
              <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.65-2.79 1.42-.58.68-1.1 1.77-.96 2.83 1.12.09 2.16-.54 2.79-1.3z" />
              </svg>
            </button>
          </div>

          {/* Quick-Access Demo Presets for Testing */}
          <div className="mt-6 pt-4 border-t border-slate-200/60 text-center">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider">
              Quick 1-Click Demo Login
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleDemoPatient}
                className="flex-1 py-1.5 px-2.5 text-xs font-medium text-slate-700 bg-white/80 hover:bg-white rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Sarah Miller (Patient)</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={handleDemoDoctor}
                className="flex-1 py-1.5 px-2.5 text-xs font-medium text-slate-700 bg-white/80 hover:bg-white rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Dr. Jenkins (Physician)</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Currently Signed In Badge if session exists */}
          {currentSession && (
            <div className="mt-4 p-3 bg-white/90 rounded-xl border border-sky-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Signed in as:</span>
                  <span className="font-bold text-slate-900">{currentSession.name}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {currentSession.role}
                </span>
              </div>
              <div className="flex gap-2 pt-1 border-t border-slate-100">
                {onOpenDashboard && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDashboard();
                    }}
                    className="flex-1 py-1 text-xs text-blue-700 hover:text-blue-900 font-semibold text-center cursor-pointer"
                  >
                    Open Health Portal
                  </button>
                )}
                {onSignOut && (
                  <button
                    type="button"
                    onClick={() => {
                      onSignOut();
                    }}
                    className="flex-1 py-1 text-xs text-red-600 hover:text-red-700 font-semibold text-center"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
