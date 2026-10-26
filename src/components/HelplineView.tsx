import React, { useState } from 'react';
import { Phone, PhoneCall, AlertTriangle, Clock, ShieldCheck, HeartPulse, CheckCircle2, ArrowRight, Activity, BellRing } from 'lucide-react';
import { HELPLINE_DATA, HelplineItem } from '../data/medicalData';

interface HelplineViewProps {
  onCallHelpline: (item: HelplineItem) => void;
}

export const HelplineView: React.FC<HelplineViewProps> = ({ onCallHelpline }) => {
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackCategory, setCallbackCategory] = useState('General Clinical Tele-Triage');
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Emergency', 'Tele-Triage', 'Pediatrics', 'Poison & Toxic', 'Mental Health', 'Senior'];

  const filteredHelplines = selectedCategoryFilter === 'All'
    ? HELPLINE_DATA
    : HELPLINE_DATA.filter((h) => h.category === selectedCategoryFilter);

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackRequested(true);
  };

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
              <span>Priority Medical Dispatch</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>24/7 Clinical Tele-Triage</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              24/7 Regional Medical Helpline Directory
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Immediate, confidential medical guidance staffed by registered triage nurses, emergency medicine specialists, and accredited toxicologists. Free of charge to all regional patients.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Life-Threatening Alert */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 bg-red-50/80 border border-red-200/90 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-red-950">Is this a life-threatening acute emergency?</h2>
              <p className="text-xs text-red-800 mt-0.5 leading-relaxed">
                For active chest crushing, inability to breathe, sudden stroke symptoms, severe arterial hemorrhage, or unconsciousness, dial 911 immediately or proceed to the nearest emergency trauma bay.
              </p>
            </div>
          </div>
          <button
            onClick={() => onCallHelpline(HELPLINE_DATA[0])}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-full shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Connect to 911 Dispatch</span>
          </button>
        </div>
      </section>

      {/* Interactive Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Select Hotline Department
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Direct lines with average response under 30 seconds</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Helpline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHelplines.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 hover:border-sky-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums">Avg {item.avgResponseSeconds}s</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{item.name}</h3>
                  <p className="text-sm font-mono font-bold text-blue-700 mt-1">{item.number}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{item.availability}</span>
                <button
                  onClick={() => onCallHelpline(item)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Immediate First Aid Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Clinical Directives</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Emergency First-Aid Quick Actions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Critical actions to perform while emergency responders are in transit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-100 text-blue-700 font-mono text-xs flex items-center justify-center font-bold">1</span>
              <span>Adult Hands-Only CPR</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Place hands center of chest. Push hard and fast at 100 to 120 compressions per minute (to the beat of "Stayin' Alive") until paramedics arrive.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-100 text-blue-700 font-mono text-xs flex items-center justify-center font-bold">2</span>
              <span>Choking / Airway Block</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Perform rapid upward abdominal thrusts (Heimlich maneuver) just above the navel. If unresponsive, lower to ground and begin CPR compressions.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-100 text-blue-700 font-mono text-xs flex items-center justify-center font-bold">3</span>
              <span>Arterial Bleeding Control</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apply firm, uninterrupted direct pressure with sterile gauze or clean cloth. If limb hemorrhage does not stop, apply an approved tourniquet 2 inches above wound.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-100 text-blue-700 font-mono text-xs flex items-center justify-center font-bold">4</span>
              <span>FAST Stroke Recognition</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>F</strong>ace drooping, <strong>A</strong>rm weakness, <strong>S</strong>peech difficulty, <strong>T</strong>ime to call 911. Do not administer aspirin until hospital CT confirms type.
            </p>
          </div>
        </div>
      </section>

      {/* Priority Callback Request Module */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-[#1c1f26] text-white rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 bg-sky-950 px-2.5 py-1 rounded-full border border-sky-800">
              <BellRing className="w-3.5 h-3.5 text-sky-400" />
              <span>Priority Nurse Callback Service</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Can't Stay on Hold? Request an Instant Callback</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Enter your mobile phone number. Our automated tele-triage routing system will maintain your exact position in queue and call your line the moment a registered nurse is free.
            </p>
          </div>

          <div className="lg:col-span-6">
            {callbackRequested ? (
              <div className="p-6 bg-slate-800/90 rounded-2xl border border-sky-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Callback Request Confirmed</h4>
                <p className="text-xs text-slate-300">
                  You are positioned <strong className="text-sky-300">#2 in queue</strong>. Expected callback within 3 to 5 minutes at <span className="font-mono text-white">{callbackPhone}</span>.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      onCallHelpline({
                        id: 'nurse-callback',
                        name: 'MedFly Clinical Nurse Callback (Incoming)',
                        number: callbackPhone,
                        category: 'Tele-Triage',
                        availability: '24/7 Registered Nurse',
                        avgResponseSeconds: 5,
                        description: `Incoming priority callback requested by ${callbackName || 'Patient'}.`,
                        priority: 'HIGH',
                      });
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Simulate Incoming Nurse Call Now
                  </button>
                  <button
                    onClick={() => setCallbackRequested(false)}
                    className="text-xs text-sky-400 hover:underline cursor-pointer px-3 py-1.5"
                  >
                    New Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRequestCallback} className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="e.g. Marcus Reid"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Specialized Helpline</label>
                  <select
                    value={callbackCategory}
                    onChange={(e) => setCallbackCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="General Clinical Tele-Triage">MedFly Registered Nurse Tele-Triage</option>
                    <option value="Pediatric Emergency">Pediatric Emergency Advice</option>
                    <option value="Senior & Geriatric">Senior & Geriatric Urgent Care</option>
                    <option value="Poison & Toxicology">Poison & Toxicology Consultation</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Hold My Place & Call Me Back
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
