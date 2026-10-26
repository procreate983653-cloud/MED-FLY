import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { NavTab } from './Header';
import { MedFlyLogo } from './MedFlyLogo';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenBooking: () => void;
  onTriggerSOS: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenBooking, onTriggerSOS }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <MedFlyLogo className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-tight">
                  Med<span className="text-sky-400">Fly</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 -mt-1">
                  Health System
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Integrated regional healthcare delivery system, Level I trauma care, 24/7 emergency dispatch, and virtual tele-triage.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-sky-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>JCI Accredited & HIPAA Certified</span>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-white transition-colors cursor-pointer">
                  About MedFly
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('helpline')} className="hover:text-white transition-colors cursor-pointer">
                  Medical Helpline 24/7
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('quick-care')} className="hover:text-white transition-colors cursor-pointer">
                  Quick Care & Telehealth
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('facilities')} className="hover:text-white transition-colors cursor-pointer">
                  Medical Facilities
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Extensions
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Hotlines Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Emergency Hotlines</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex justify-between">
                <span>Ambulance & Trauma:</span>
                <strong className="text-red-400 font-mono">911</strong>
              </li>
              <li className="flex justify-between">
                <span>Clinical Tele-Triage:</span>
                <span className="text-white font-mono">1-800-555-CARE</span>
              </li>
              <li className="flex justify-between">
                <span>Poison Control:</span>
                <span className="text-white font-mono">1-800-222-1222</span>
              </li>
              <li className="flex justify-between">
                <span>Suicide & Crisis:</span>
                <span className="text-white font-mono">988</span>
              </li>
              <li className="flex justify-between">
                <span>Pediatric Hotline:</span>
                <span className="text-white font-mono">1-800-555-PEDS</span>
              </li>
            </ul>
          </div>

          {/* Fast Actions Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Care Access</h4>
            <p className="text-slate-400 text-xs">
              Schedule urgent care walk-ins or reserve an appointment with a board-certified physician.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
              >
                Schedule Appointment
              </button>
              <button
                onClick={onTriggerSOS}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-red-400 font-semibold rounded-lg text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                Call Emergency Dispatch
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} MedFly Health System, Inc. All rights reserved. JCI Accredited Hospital Network.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>HIPAA Privacy Certified</span>
            <span>·</span>
            <span>Advisory Clinical Protocols</span>
            <span>·</span>
            <span>Patient Bill of Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
