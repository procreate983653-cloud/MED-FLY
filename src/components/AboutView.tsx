import React from 'react';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2, Users, Building, Activity, PhoneCall, Calendar } from 'lucide-react';
import { NavTab } from './Header';
import medicalTeamSpecialists from '../assets/images/medical_team_specialists_1792925316495.jpg';

interface AboutViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenBooking: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner with Concentric Ripple Curves */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#87bce2]/40 via-[#b6dbf2]/20 to-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-sky-100/60">
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <svg
            className="absolute w-[150vw] h-[150vw] max-w-[1600px] max-h-[1600px] opacity-25 -translate-y-12"
            viewBox="0 0 1000 1000"
            fill="none"
          >
            <circle cx="500" cy="500" r="280" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="500" cy="500" r="420" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="500" cy="500" r="580" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Our Clinical Foundation</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Regional Healthcare Leadership</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Pioneering Acute Care, Patient Dignity, and Rapid Response.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Founded to eliminate preventable emergency delays, MedFly Health System operates an integrated network of Level I Trauma centers, regional acute hospitals, community urgent clinics, and round-the-clock tele-triage specialists.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Visual & Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-blue-500/10">
            <img
              src={medicalTeamSpecialists}
              alt="MedFly senior clinical specialists and surgeons"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Clinical Governance</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                A Unified Continuum of Acute Medical Care
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every facility within the MedFly umbrella adheres to the most stringent international medical protocols. From our rapid medical flight and trauma resuscitation teams to digital telehealth practitioners, patient safety is supported by real-time clinical decision intelligence.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Joint Commission International (JCI) Gold Seal</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Recognized for top-decile clinical quality, antibiotic stewardship, and surgical safety metrics.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors">
                <Award className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Comprehensive Stroke & STEMI Heart Center</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Average door-to-balloon angioplasty time of under 48 minutes, significantly exceeding national standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors">
                <HeartHandshake className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Patient-First Transparent Healthcare</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Immediate access to your electronic health records, transparent pricing with no surprise billing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Impact Metrics (Section 1H Claim-to-Proof) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-white rounded-3xl shadow-xl shadow-blue-500/5 border border-sky-100">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Documented Outcomes</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Proven Clinical Outcomes</h3>
            <p className="text-xs sm:text-sm text-slate-500">Documented metrics audited across our 6 regional medical facilities over the past calendar year.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="block text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono tabular-nums">4.2 min</span>
              <span className="text-xs text-slate-600 mt-1 block">Average Emergency Dispatch</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="block text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono tabular-nums">140,000+</span>
              <span className="text-xs text-slate-600 mt-1 block">Patients Treated Annually</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="block text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono tabular-nums">450+</span>
              <span className="text-xs text-slate-600 mt-1 block">Board-Certified Specialists</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="block text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono tabular-nums">99.4%</span>
              <span className="text-xs text-slate-600 mt-1 block">Acute STEMI Survival Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Leadership & Advisory Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Executive Leadership</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Clinical Advisory Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            Renowned department chiefs and medical researchers directing standards of emergency, pediatric, and surgical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200/60 font-bold text-sm flex items-center justify-center">
              DR
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Dr. Julian Vance, MD, FACS</h3>
              <p className="text-xs font-semibold text-blue-700">Chief Medical Officer & Trauma Director</p>
              <p className="text-xs text-slate-500 mt-0.5">Harvard Medical School · Former Acute Surgery Chief at Johns Hopkins</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              Leads MedFly trauma readiness protocols and rapid helicopter air-ambulance coordination across the tri-county area.
            </p>
          </div>

          <div className="p-7 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200/60 font-bold text-sm flex items-center justify-center">
              DR
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Dr. Sarah Jenkins, MD</h3>
              <p className="text-xs font-semibold text-blue-700">Director of Tele-Triage & Urgent Care</p>
              <p className="text-xs text-slate-500 mt-0.5">Stanford Health Care Fellow · Board Certified ABEM / ABFM</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              Architect of the MedFly Quick Care virtual assessment algorithm, reducing non-urgent ER waiting room congestion by 38%.
            </p>
          </div>

          <div className="p-7 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200/60 font-bold text-sm flex items-center justify-center">
              DR
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Dr. Elena Rostova, MD, FAAP</h3>
              <p className="text-xs font-semibold text-blue-700">Head of Pediatric Emergency Services</p>
              <p className="text-xs text-slate-500 mt-0.5">Boston Children's Hospital Fellow · Pediatric Intensive Care</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              Specializes in neonatal resuscitation, pediatric airway trauma, and compassionate family-centered pediatric emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-[#1c1f26] text-white rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Have Questions or Need to Schedule Care?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Our patient navigators are available to assist with insurance verification, medical record transfers, and doctor consultations.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-md transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/20 transition-colors cursor-pointer"
            >
              Contact Directory
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
