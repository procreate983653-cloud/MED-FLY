import React, { useState } from 'react';
import { Phone, ArrowRight, CheckCircle2, ChevronRight, AlertCircle, Building2, Clock, Activity, ShieldCheck, Stethoscope, Video, HeartPulse, RefreshCw, Calendar, MapPin } from 'lucide-react';
import { HELPLINE_DATA, ON_CALL_DOCTORS, FACILITIES_DATA, HelplineItem } from '../data/medicalData';
import { NavTab } from './Header';
import medicalFacilityExterior from '../assets/images/medical_facility_exterior_1792925315899.jpg';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  onCallHelpline: (item: HelplineItem) => void;
  onOpenBooking: (facilityId?: string) => void;
}

interface TriageOption {
  id: string;
  label: string;
  urgency: 'critical' | 'urgent' | 'routine';
  urgencyLabel: string;
  recommendedAction: string;
  destination: 'helpline' | 'quick-care' | 'booking';
  facilityId?: string;
}

const TRIAGE_PRESETS: TriageOption[] = [
  {
    id: 'chest-pain',
    label: 'Chest Pressure / Shortness of Breath',
    urgency: 'critical',
    urgencyLabel: 'Life-Threatening Emergency',
    recommendedAction: 'Immediate dispatch protocol. Do not drive yourself. Connect to 911 trauma triage immediately.',
    destination: 'helpline',
  },
  {
    id: 'pediatric-fever',
    label: 'Pediatric Fever (102°F+) & Lethargy',
    urgency: 'urgent',
    urgencyLabel: 'Urgent Pediatric Attention',
    recommendedAction: 'Connect with an on-call pediatrician via 15-minute video telehealth or visit Children’s Specialty Center.',
    destination: 'quick-care',
  },
  {
    id: 'sprain-fracture',
    label: 'Sprained Ankle / Suspected Fracture',
    urgency: 'urgent',
    urgencyLabel: 'Same-Day Urgent Care',
    recommendedAction: 'Reserve a priority spot at Westside Urgent Care with digital X-ray diagnostics on-site.',
    destination: 'booking',
    facilityId: 'fac-2',
  },
  {
    id: 'migraine-sinus',
    label: 'Severe Migraine / Sore Throat',
    urgency: 'routine',
    urgencyLabel: 'Outpatient Virtual Care',
    recommendedAction: 'Start an instant virtual consultation with an on-call family practitioner for digital prescription routing.',
    destination: 'quick-care',
  },
  {
    id: 'rx-refill',
    label: 'Prescription Refill / Lab Review',
    urgency: 'routine',
    urgencyLabel: 'Clinical Pharmacy Request',
    recommendedAction: 'Submit a 1-click refill order to MedFly Central Compounding Pharmacy for same-day delivery.',
    destination: 'quick-care',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onCallHelpline, onOpenBooking }) => {
  const [selectedTriage, setSelectedTriage] = useState<TriageOption>(TRIAGE_PRESETS[0]);
  const [facilities, setFacilities] = useState(FACILITIES_DATA);
  const [isRefreshingWait, setIsRefreshingWait] = useState(false);
  const [lastUpdatedText, setLastUpdatedText] = useState('Updated just now');
  const emergencyLine = HELPLINE_DATA[0];

  const handleRefreshWaitTimes = () => {
    setIsRefreshingWait(true);
    setTimeout(() => {
      setFacilities((prev) =>
        prev.map((f) => {
          const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2 mins
          const newWait = Math.max(3, f.waitMinutes + delta);
          return { ...f, waitMinutes: newWait };
        })
      );
      setLastUpdatedText('Updated just now');
      setIsRefreshingWait(false);
    }, 500);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Ethereal Hero Section with Concentric Ripple Arcs & Sky Atmosphere */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#87bce2]/40 via-[#b6dbf2]/20 to-white pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-sky-100/60">
        
        {/* Background Concentric SVG Rings matching Ebolt visual theme */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <svg
            className="absolute w-[160vw] h-[160vw] max-w-[1800px] max-h-[1800px] opacity-30 -translate-y-16"
            viewBox="0 0 1000 1000"
            fill="none"
          >
            <circle cx="500" cy="500" r="260" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.35" />
            <circle cx="500" cy="500" r="380" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="500" cy="500" r="500" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.18" />
            <circle cx="500" cy="500" r="630" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.12" />
            <circle cx="500" cy="500" r="780" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.08" />
          </svg>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-72 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-7 flex flex-col items-center">

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.08] max-w-4xl" style={{ textWrap: 'balance' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600">Precision Healthcare</span>
              {' '}for Life’s{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 text-blue-950 font-black">Critical Moments</span>
                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-3 sm:h-4 bg-gradient-to-r from-sky-200 to-blue-200/90 -rotate-1 rounded-sm -z-0" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed font-normal">
              Connect directly with <span className="font-semibold text-blue-950 bg-sky-100/90 px-2 py-0.5 rounded-md border border-sky-200 shadow-2xs">board-certified physicians in under 15 minutes</span>, monitor live emergency room capacity, and reserve urgent walk-in care across <span className="font-semibold text-blue-950 bg-blue-100/90 px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">6 regional medical facilities</span>.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 bg-[#1c1f26] hover:bg-black text-white font-semibold text-sm rounded-full shadow-lg shadow-slate-900/10 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4 text-sky-300" />
                <span>Reserve Appointment</span>
              </button>

              <button
                onClick={() => onNavigate('quick-care')}
                className="px-5 py-3.5 bg-white hover:bg-sky-50 text-slate-700 hover:text-blue-700 font-semibold text-sm rounded-full border border-slate-200/80 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Quick Care Video</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust Evidence adjacent to hero (Section 1H Claim-to-Proof) */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 sm:gap-6 text-slate-600 w-full max-w-2xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-200/80 shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-blue-800 tabular-nums">4.2 min</span>
                <span className="text-xs sm:text-sm font-bold text-slate-700">Ambulance Dispatch</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-200/80 shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-blue-800 tabular-nums">24 / 7</span>
                <span className="text-xs sm:text-sm font-bold text-slate-700">On-Call Staff Doctors</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-200/80 shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-blue-800 tabular-nums">6 Centers</span>
                <span className="text-xs sm:text-sm font-bold text-slate-700">Hospitals & Urgent Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Regional Care Network Wait-Time Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-200/90 shadow-2xl shadow-blue-900/5 p-6 sm:p-7 space-y-6">
          {/* Top accent radiant bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-400" />

          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="relative p-3 bg-gradient-to-br from-blue-600 to-sky-600 text-white rounded-2xl shadow-md shadow-blue-500/20 shrink-0">
                <Clock className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
                    Live Regional Hospital & Urgent Care <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-600">Wait Times</span>
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-time telemetry</span>
                    <span className="text-slate-400 font-normal">·</span>
                    <span className="text-emerald-700 font-medium">{lastUpdatedText}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                  Live sensor & triage tracking across regional MedFly healthcare facilities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start lg:self-center">
              <button
                onClick={handleRefreshWaitTimes}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-blue-900 bg-sky-50 hover:bg-sky-100 active:bg-sky-200 border border-sky-200/80 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Refresh wait estimates"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshingWait ? 'animate-spin' : ''}`} />
                <span>{isRefreshingWait ? 'Updating...' : 'Refresh Feed'}</span>
              </button>

              <button
                onClick={() => onNavigate('facilities')}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer"
              >
                <span>All Facilities</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* 4 Facility Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {facilities.slice(0, 4).map((facility) => {
              const isFastWait = facility.waitMinutes <= 10;
              return (
                <div
                  key={facility.id}
                  className="relative p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/70 hover:to-sky-50/40 border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Location & Wait Time Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold truncate">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="truncate">{facility.city}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-mono font-black text-xs border shadow-2xs flex items-center gap-1 shrink-0 ${
                        isFastWait
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-blue-50 text-blue-900 border-blue-200'
                      }`}>
                        <Clock className="w-3 h-3 text-current opacity-70" />
                        <span>{facility.waitMinutes}m wait</span>
                      </span>
                    </div>

                    {/* Facility Name */}
                    <div>
                      <h3 className="text-sm font-black text-slate-950 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {facility.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] font-bold text-blue-800 bg-blue-100/70 border border-blue-200/60 px-2 py-0.5 rounded-md">
                          {facility.type}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {facility.emergencyOpen ? 'Open 24/7' : 'Walk-in Active'}
                        </span>
                      </div>
                    </div>

                    {/* Capacity / Stat Footnote */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{facility.bedOccupancy}</span>
                      <span className="font-bold text-slate-700">★ {facility.rating}</span>
                    </div>
                  </div>

                  {/* Booking CTA Button */}
                  <button
                    onClick={() => onOpenBooking(facility.id)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 group-hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow-md hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Reserve Spot</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom live assurance info strip */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>
                Average network wait time: <strong className="text-slate-900 font-bold">12.5 mins</strong> · Critical trauma arrivals bypass wait queues with instant resuscitation bed hold.
              </span>
            </div>
            <button
              onClick={() => onNavigate('quick-care')}
              className="text-blue-700 hover:text-blue-900 font-bold hover:underline shrink-0 cursor-pointer"
            >
              Need care at home? Launch 15-Min Telehealth →
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Symptom Self-Triage Engine (Alive & Engaging) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider inline-block">
              Clinical Decision Support
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight mt-2">
              Interactive <span className="text-blue-700">Symptom Care Navigator</span>
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md font-medium leading-relaxed">
            Unsure whether to visit the emergency department, urgent care, or start a virtual consultation? Select your primary symptom below.
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/50 rounded-3xl border border-sky-200/80 shadow-xl shadow-blue-500/5 space-y-6">
          {/* Symptom Selection Buttons */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-3">
              1. What acute symptoms are you or your family experiencing?
            </label>
            <div className="flex flex-wrap gap-2.5">
              {TRIAGE_PRESETS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedTriage(option)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedTriage.id === option.id
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/20 ring-2 ring-blue-600/30'
                      : 'bg-white text-slate-800 hover:bg-sky-100 hover:text-blue-900 border-slate-300 shadow-2xs'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Assessment Output Box */}
          <div className="p-6 bg-white rounded-2xl border border-sky-200 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full ${
                  selectedTriage.urgency === 'critical' ? 'bg-red-500 animate-pulse' :
                  selectedTriage.urgency === 'urgent' ? 'bg-amber-500' : 'bg-blue-600'
                }`} />
                <span className="text-sm font-black text-slate-950">
                  Care Pathway: <span className="text-blue-800 font-extrabold">{selectedTriage.urgencyLabel}</span>
                </span>
              </div>
              <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full">Audited under MedFly Health System Clinical Protocols</span>
            </div>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              {selectedTriage.recommendedAction}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {selectedTriage.destination === 'helpline' && (
                <button
                  onClick={() => onCallHelpline(emergencyLine)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Emergency Dispatch</span>
                </button>
              )}

              {selectedTriage.destination === 'quick-care' && (
                <button
                  onClick={() => onNavigate('quick-care')}
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Launch 15-Min Telehealth Room</span>
                </button>
              )}

              {selectedTriage.destination === 'booking' && (
                <button
                  onClick={() => onOpenBooking(selectedTriage.facilityId)}
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Hold Walk-in Priority Spot</span>
                </button>
              )}

              <button
                onClick={() => onNavigate('facilities')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                View Nearby Walk-In Locations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Clinical Infrastructure Bento-Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider inline-block">
            Unified Health Network
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight mt-2">
            Comprehensive <span className="text-blue-700">Clinical Capabilities</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mt-1.5 font-medium">
            Engineered to deliver seamless transitions from acute resuscitation to primary care and home wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: Level I Trauma (spans 7 cols) */}
          <div className="lg:col-span-7 p-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700">01. Acute Intervention</span>
              <h3 className="text-xl font-bold text-slate-900">Level I Emergency & Trauma Care</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                24/7 dedicated acute resuscitation suites, rapid multi-detector CT within 8 minutes of arrival, biplane neuro-interventional stroke suites, and in-house board-certified trauma surgeons.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="font-bold text-slate-900 block font-mono text-sm">48 min</span>
                <span className="text-slate-500 text-[11px]">Door-to-Balloon</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block font-mono text-sm">8 min</span>
                <span className="text-slate-500 text-[11px]">Stroke CT Scan</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block font-mono text-sm">100%</span>
                <span className="text-slate-500 text-[11px]">In-House Coverage</span>
              </div>
            </div>
          </div>

          {/* Card 2: 15-Minute Telehealth (spans 5 cols) */}
          <div className="lg:col-span-5 p-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700">02. Virtual Care</span>
              <h3 className="text-xl font-bold text-slate-900">Virtual Quick Care & Telehealth</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Skip clinic waiting rooms for non-emergency illnesses. Connect with our on-call family physicians in 15 minutes for diagnoses, sick notes, and instant e-prescriptions.
              </p>
            </div>

            <button
              onClick={() => onNavigate('quick-care')}
              className="w-full py-2.5 px-4 bg-[#1c1f26] hover:bg-black text-white text-xs font-semibold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-sky-300" />
              <span>Launch Virtual Care Room</span>
            </button>
          </div>

          {/* Card 3: Diagnostic Labs (spans 5 cols) */}
          <div className="lg:col-span-5 p-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700">03. High-Res Diagnostics</span>
              <h3 className="text-xl font-bold text-slate-900">Diagnostic Imaging & Molecular Labs</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Advanced 3T silent MRI, dual-source 256-slice cardiac CT, digital 3D mammography, and on-site molecular microbiology for 45-minute pathogen confirmation.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Same-day results available on digital patient portal</span>
            </div>
          </div>

          {/* Card 4: Priority Helplines (spans 7 cols) */}
          <div className="lg:col-span-7 p-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-blue-700">04. Emergency Dispatch</span>
              <h3 className="text-xl font-bold text-slate-900">24/7 Priority Emergency Helplines</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct hotline access staffed by licensed triage nurses, poison control toxicologists, and mental health crisis counselors with average call answer under 30 seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onCallHelpline(emergencyLine)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Emergency Hotline</span>
              </button>
              <button
                onClick={() => onCallHelpline(HELPLINE_DATA[1])}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                1-800-555-CARE Nurse Line
              </button>
              <button
                onClick={() => onNavigate('helpline')}
                className="px-4 py-2 text-blue-700 hover:underline text-xs font-semibold cursor-pointer"
              >
                View All Hotlines →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Board-Certified Specialists & Clinical Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Clinical Leadership</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              On-Call Physicians & Department Chiefs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Learn About Clinical Governance</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ON_CALL_DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                    doc.availableToday ? 'bg-sky-50 text-blue-800 border border-sky-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {doc.availableToday ? 'On-Call Now' : 'Duty Tomorrow'}
                  </span>
                  <span className="font-bold text-slate-800 font-mono">★ {doc.rating}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{doc.name}</h4>
                <p className="text-xs font-semibold text-blue-700">{doc.specialty}</p>
                <p className="text-xs text-slate-500 leading-snug">{doc.credentials}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-400 block text-[11px]">Primary Hospital</span>
                <span className="font-semibold text-slate-800 block truncate">{doc.hospital}</span>
                <button
                  onClick={() => onOpenBooking()}
                  className="mt-3 w-full py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-slate-200 hover:border-blue-600"
                >
                  Book with {doc.name.split(' ')[1]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Teaser Split Card with Exterior Architecture Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Regional Network</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              State-of-the-Art Medical Facilities Across the Region
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Locate fully equipped acute care hospitals, level I trauma pavilions, pediatric urgent clinics, and round-the-clock pharmacies with live bed occupancy and wait time telemetry.
            </p>
            <div className="pt-2 flex flex-wrap gap-3.5">
              <button
                onClick={() => onNavigate('facilities')}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Explore All Facilities</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/20 transition-all cursor-pointer"
              >
                Direct Clinic Directory
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 min-h-[300px] relative">
            <img
              src={medicalFacilityExterior}
              alt="MedFly Health System architectural exterior pavilion"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent lg:block hidden" />
          </div>
        </div>
      </section>
    </div>
  );
};
