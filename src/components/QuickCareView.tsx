import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, Video, Clock, CheckCircle2, ArrowRight, ShieldCheck, Pill, MapPin, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import { SYMPTOM_DATA, URGENT_CARE_LIST, ON_CALL_DOCTORS, SymptomAssessment } from '../data/medicalData';
import { NavTab } from './Header';
import quickCareDoctor from '../assets/images/quick_care_doctor_1792925316267.jpg';

interface QuickCareViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenBooking: () => void;
}

export const QuickCareView: React.FC<QuickCareViewProps> = ({ onNavigate, onOpenBooking }) => {
  // Symptom Checker State
  const [selectedAssessment, setSelectedAssessment] = useState<SymptomAssessment>(SYMPTOM_DATA[0]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  // Telehealth Simulation State
  const [isInTelehealthRoom, setIsInTelehealthRoom] = useState(false);
  const [telehealthStep, setTelehealthStep] = useState<'queue' | 'connected'>('queue');
  const [chatMessages, setChatMessages] = useState<{ sender: 'doc' | 'user'; text: string; time: string }[]>([
    { sender: 'doc', text: 'Hello! I am Dr. Sarah Jenkins. I am reviewing your preliminary triage check. Where is the discomfort primarily localized today?', time: 'Just now' },
  ]);
  const [userChatInput, setUserChatInput] = useState('');

  // Check-In State for urgent care
  const [checkedInClinicId, setCheckedInClinicId] = useState<string | null>(null);
  const [checkInBannerText, setCheckInBannerText] = useState<string | null>(null);

  // Prescription Quick Refill State
  const [refillRxNumber, setRefillRxNumber] = useState('');
  const [refillDob, setRefillDob] = useState('');
  const [refillSubmitted, setRefillSubmitted] = useState(false);

  const currentOption = selectedOptionIndex !== null ? selectedAssessment.options[selectedOptionIndex] : null;

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [consultationConcluded, setConsultationConcluded] = useState(false);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const query = userChatInput.trim();
    if (!query) return;

    const newMsg = { sender: 'user' as const, text: query, time: 'Just now' };
    setChatMessages((prev) => [...prev, newMsg]);
    setUserChatInput('');

    setTimeout(() => {
      let reply = 'I have carefully charted your condition. Your acute presentation is within safe outpatient parameters. I have transmitted an electronic prescription to MedFly Central Pharmacy.';
      const lower = query.toLowerCase();

      if (lower.includes('fever') || lower.includes('temp') || lower.includes('hot')) {
        reply = 'For fever management, stay well hydrated and alternate acetaminophen with ibuprofen every 4-6 hours. If your fever exceeds 102.5°F or is accompanied by confusion, please dial our emergency line.';
      } else if (lower.includes('cough') || lower.includes('throat') || lower.includes('phlegm') || lower.includes('cold')) {
        reply = 'Those symptoms are consistent with upper respiratory irritation. I am transmitting an order for a therapeutic cough syrup and zinc lozenges to your preferred pharmacy, and charting 3 days of rest.';
      } else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('pain')) {
        reply = 'Understood. I am sending an order for targeted non-sedating migraine relief. Please rest in a dimly lit room and maintain steady electrolyte hydration. Follow up if visual disturbances worsen.';
      } else if (lower.includes('note') || lower.includes('work') || lower.includes('school') || lower.includes('excuse')) {
        reply = 'I have generated a verified medical excuse certificate covering 48 hours for recovery. It is now filed directly in your MedFly patient health portal for download.';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'doc',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const handleStartTelehealth = () => {
    setIsInTelehealthRoom(true);
    setTelehealthStep('queue');
    setConsultationConcluded(false);
    setTimeout(() => {
      setTelehealthStep('connected');
    }, 2000);
  };

  const handleUrgentCheckIn = (clinicId: string, clinicName: string) => {
    setCheckedInClinicId(clinicId);
    setCheckInBannerText(`You have been checked in at ${clinicName}! Your position in the walk-in queue is held. An SMS reminder will arrive 15 minutes before your estimated time.`);
  };

  const handleRefillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refillRxNumber.trim()) return;
    setRefillSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
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
              <span>Fast Triage & Telehealth</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Same-Day Relief</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
              Med<span className="text-blue-700">Fly</span> Quick Care & Digital Triage
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Find the right level of care without unnecessary waiting. <span className="bg-sky-100/90 text-blue-950 font-semibold px-2 py-0.5 rounded border border-sky-200">Self-triage your symptoms</span>, join an instant virtual doctor queue, or hold your spot at a nearby urgent care center.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Clinical Symptom Checker & Triage Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Self-Service Evaluation</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Interactive Symptom Triage Assessment
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5">
            Select your symptom category to receive evidence-based disposition guidance verified by Board-Certified Emergency Physicians.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {SYMPTOM_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedAssessment(item);
                setSelectedOptionIndex(null);
              }}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                selectedAssessment.id === item.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Triage Questionnaire Container */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              {selectedAssessment.severityQuestion}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Common associated symptoms:</span>
              {selectedAssessment.symptoms.map((sym, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px]">
                  {sym}
                </span>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-700 block">Select the statement that matches your current condition:</span>
            {selectedAssessment.options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedOptionIndex(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                  selectedOptionIndex === idx
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-slate-900 block">{option.label}</span>
                  <span className="text-xs text-slate-500 block">{option.action}</span>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wider ${
                  option.level === 'emergency'
                    ? 'bg-red-100 text-red-800'
                    : option.level === 'urgent'
                    ? 'bg-amber-100 text-amber-800'
                    : option.level === 'telehealth'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {option.timeline}
                </span>
              </button>
            ))}
          </div>

          {/* Triage Disposition Advice Box */}
          {currentOption && (
            <div className={`p-5 rounded-2xl border ${
              currentOption.level === 'emergency'
                ? 'bg-red-50 border-red-200 text-red-950'
                : currentOption.level === 'urgent'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-blue-50 border-blue-200 text-blue-950'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-blue-700" />
                    <h4 className="text-sm font-bold uppercase tracking-wide">
                      Recommended Care Level: {currentOption.level.toUpperCase()}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed">{currentOption.action}</p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {currentOption.level === 'emergency' ? (
                    <button
                      onClick={() => onNavigate('helpline')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Call Emergency Dispatch 911
                    </button>
                  ) : currentOption.level === 'urgent' ? (
                    <button
                      onClick={onOpenBooking}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Reserve Walk-In Urgent Spot
                    </button>
                  ) : (
                    <button
                      onClick={handleStartTelehealth}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Launch Telehealth Visit Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Instant Virtual Telehealth Queue & Simulation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl border border-blue-800/40 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 bg-sky-950 px-3 py-1 rounded border border-sky-800">
              <Video className="w-3.5 h-3.5 text-sky-400" />
              <span>Virtual Urgent Care Room</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Connect with an On-Call Doctor in ~3 Minutes
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Skip travel and waiting rooms. Our board-certified physicians diagnose, treat, and prescribe medications for cough, sore throat, allergies, urinary discomfort, minor rashes, and routine medication refills via secure high-definition video.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky-400" /> Wait: 3 mins</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-sky-400" /> HIPAA Encrypted</span>
              <span>·</span>
              <span className="text-sky-300 font-semibold">$0 with most insurances</span>
            </div>
            <button
              onClick={handleStartTelehealth}
              className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Join Virtual Waiting Queue</span>
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-lg relative min-h-[260px]">
              <img
                src={quickCareDoctor}
                alt="MedFly Telehealth Doctor conducting a digital patient consult"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/80 backdrop-blur-xs rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Dr. Sarah Jenkins, MD</span>
                  <span className="text-slate-400 text-[11px]">Chief Telehealth Attending · Online</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Ready to Connect
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Telehealth Consultation Active Modal */}
        {isInTelehealthRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-2xl bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white tracking-wide">MEDFLY SECURE TELE-CONSULT SUITE</span>
                </div>
                <button
                  onClick={() => setIsInTelehealthRoom(false)}
                  className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2.5 py-1 rounded"
                >
                  Leave Consult
                </button>
              </div>

              {telehealthStep === 'queue' ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center mx-auto animate-pulse">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Preparing Your Virtual Examination Room</h4>
                  <p className="text-xs text-slate-300">
                    Connecting audio/video streams with Dr. Sarah Jenkins, MD. Checking camera permissions and clinical intake notes...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col flex-1 overflow-hidden">
                  {/* Doctor Video Frame */}
                  <div className="relative bg-slate-950 h-56 flex items-center justify-center border-b border-slate-800">
                    <img
                      src={quickCareDoctor}
                      alt="Doctor on video call"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Dr. Sarah Jenkins, MD (Attending)</span>
                    </div>

                    {/* Camera preview window */}
                    <div className="absolute bottom-3 right-3 w-28 h-20 bg-slate-800 rounded-lg border border-slate-600 overflow-hidden flex items-center justify-center text-center p-1 text-[10px] text-slate-300">
                      {isCameraOff ? (
                        <span className="text-slate-400">Camera Paused</span>
                      ) : (
                        <div className="space-y-1">
                          <User className="w-5 h-5 mx-auto text-sky-400" />
                          <span>Patient Video</span>
                        </div>
                      )}
                    </div>

                    {/* In-Call Controls Overlay */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsMicMuted(!isMicMuted)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                          isMicMuted ? 'bg-red-600 text-white' : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        {isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCameraOff(!isCameraOff)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                          isCameraOff ? 'bg-amber-600 text-white' : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        {isCameraOff ? 'Turn On Video' : 'Turn Off Video'}
                      </button>
                    </div>
                  </div>

                  {/* Quick Clinician Questions */}
                  <div className="px-3 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px]">
                    <span className="text-slate-400 shrink-0">Quick Ask:</span>
                    {[
                      'How to manage fever safely?',
                      'Can I get an official work excuse note?',
                      'Will I need an antibiotic prescription?',
                    ].map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          setUserChatInput(prompt);
                        }}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-md shrink-0 transition-colors cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  {/* Chat Stream */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900 text-xs">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-3 rounded-2xl ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-br-xs'
                              : 'bg-slate-800 text-slate-200 rounded-bl-xs border border-slate-700'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className="text-[10px] opacity-60 block mt-1 text-right">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleSendChat} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                    <input
                      type="text"
                      value={userChatInput}
                      onChange={(e) => setUserChatInput(e.target.value)}
                      placeholder="Type medical query or symptom details..."
                      className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 3. Live Urgent Care Walk-in Wait Times & Online Check-In */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Walk-In Clinics</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Urgent Care Walk-In Locations & Live Wait Times
            </h2>
          </div>
          <p className="text-xs text-slate-500">Wait times updated every 60 seconds</p>
        </div>

        {checkInBannerText && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-900 shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{checkInBannerText}</span>
            </div>
            <button
              onClick={() => setCheckInBannerText(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold px-2 py-0.5"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {URGENT_CARE_LIST.map((clinic) => (
            <div
              key={clinic.id}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Open until {clinic.openUntil}</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-blue-800 tabular-nums">
                      ~{clinic.currentWaitMin} min
                    </span>
                    <span className="block text-[11px] text-slate-400">estimated wait</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{clinic.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{clinic.location}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Rapid PCR & Flu Swabs
                  </span>
                  {clinic.xrayAvailable && (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Digital X-Ray On-Site
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{clinic.patientsInQueue} patients currently in queue</span>
                {checkedInClinicId === clinic.id ? (
                  <span className="px-3.5 py-1.5 bg-blue-100 text-blue-800 font-bold text-xs rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Spot Held</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleUrgentCheckIn(clinic.id, clinic.name)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Check In Online
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Express Prescription Refill Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-gradient-to-br from-slate-50 to-sky-50/70 rounded-3xl border border-slate-200">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-blue-700 flex items-center justify-center mx-auto">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Express Prescription Refill</h3>
              <p className="text-xs text-slate-600 mt-1">
                Enter your Rx Number from your pill bottle to have it filled at MedFly 24/7 Compounding Pharmacy or delivered directly to your door.
              </p>
            </div>

            {refillSubmitted ? (
              <div className="p-5 bg-white rounded-2xl border border-sky-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Refill Request Dispatched</h4>
                <p className="text-xs text-slate-600">
                  Rx #{refillRxNumber} is being prepared by our central pharmacy. Estimated pickup readiness in 45 minutes.
                </p>
                <button
                  onClick={() => setRefillSubmitted(false)}
                  className="text-xs text-blue-700 font-semibold hover:underline"
                >
                  Submit another refill
                </button>
              </div>
            ) : (
              <form onSubmit={handleRefillSubmit} className="space-y-3 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Prescription (Rx) Number</label>
                    <input
                      type="text"
                      required
                      value={refillRxNumber}
                      onChange={(e) => setRefillRxNumber(e.target.value)}
                      placeholder="e.g. RX-904128"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Patient Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={refillDob}
                      onChange={(e) => setRefillDob(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Verify & Process Refill
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
