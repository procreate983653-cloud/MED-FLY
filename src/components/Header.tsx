import React, { useState } from 'react';
import { User, LogOut, LogIn } from 'lucide-react';
import { UserSession } from './AuthModal';
import { MedFlyLogo } from './MedFlyLogo';

export type NavTab = 'home' | 'about' | 'helpline' | 'quick-care' | 'facilities' | 'contact';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  session: UserSession | null;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onSignOut: () => void;
  onTriggerSOS?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  session,
  onOpenLogin,
  onOpenDashboard,
  onSignOut,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'helpline', label: 'Helpline' },
    { id: 'quick-care', label: 'Quick Care' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-18 sm:h-20">
          
          {/* Zone 1: Brand emblem & wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none shrink-0 group cursor-pointer"
            title="MedFly Health System - Home"
            aria-label="MedFly Health System Logo"
          >
            {/* Circle with Wings emblem */}
            <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95">
              <MedFlyLogo className="w-11 h-11 drop-shadow-md" />
            </div>

            {/* Brand title */}
            <div className="flex flex-col">
              <span className="font-sans font-extrabold tracking-tight text-lg sm:text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                Med<span className="text-blue-600">Fly</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 hidden sm:inline -mt-0.5">
                Health System
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (single-line, clean unboxed controls) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Profile / 1-Click Logout */}
            {session ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer ring-2 ring-sky-200 active:scale-95"
                    title={`${session.name} - Profile Menu`}
                    aria-label="User Profile"
                  >
                    {session.name.substring(0, 2).toUpperCase()}
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                      <div className="px-3.5 py-2.5 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{session.name}</p>
                        <p className="text-slate-500 text-[11px] truncate">{session.email}</p>
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {session.role === 'doctor' ? 'Staff Clinician' : 'Patient ID'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenDashboard();
                        }}
                        className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-sky-50 hover:text-blue-700 flex items-center gap-2 cursor-pointer font-sans transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span>{session.role === 'doctor' ? 'Clinical Control Desk' : 'Patient Health Portal'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenLogin();
                        }}
                        className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-sky-50 hover:text-blue-700 flex items-center gap-2 cursor-pointer font-sans transition-colors border-t border-slate-100"
                      >
                        <LogIn className="w-3.5 h-3.5 text-blue-600" />
                        <span>Profile & Sign In Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onSignOut();
                        }}
                        className="w-full text-left px-3.5 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100 cursor-pointer font-sans font-semibold transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-600" />
                        <span>Log Out (1-Click)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct 1-Click Logout button right next to avatar */}
                <button
                  onClick={onSignOut}
                  className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Click here to log out immediately"
                  aria-label="Direct Log Out"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 rounded-full bg-[#1c1f26] hover:bg-black text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                title="Sign In / Open Profile"
                aria-label="Login Icon"
              >
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1 font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
