import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, ShieldAlert, MapPin, Activity, CheckCircle2 } from 'lucide-react';
import { HelplineItem } from '../data/medicalData';

interface CallSimulationModalProps {
  helpline: HelplineItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CallSimulationModal: React.FC<CallSimulationModalProps> = ({ helpline, isOpen, onClose }) => {
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [triageStep, setTriageStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCallStatus('connecting');
      setSeconds(0);
      setTriageStep(0);
      return;
    }

    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
    }, 1800);

    return () => clearTimeout(connectTimer);
  }, [isOpen]);

  useEffect(() => {
    let interval: any = null;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  if (!isOpen || !helpline) return null;

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const triageDirectives = [
    'Verifying patient consciousness and airway patency.',
    'Assessing breathing effort and skin temperature.',
    'Emergency response unit alerted and on standby.',
    'Immediate clinical instructions provided based on symptom severity.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
        {/* Top Emergency Indicator */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold tracking-wide text-red-400">MEDFLY PRIORITY DISPATCH LINE</span>
          </div>
          <span className="text-slate-400 font-mono">ENCRYPTED VOIP</span>
        </div>

        {/* Center Calling Area */}
        <div className="p-8 text-center space-y-6">
          <div className="relative mx-auto w-24 h-24 rounded-full bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center">
            {callStatus === 'connecting' ? (
              <Phone className="w-10 h-10 text-sky-400 animate-bounce" />
            ) : callStatus === 'connected' ? (
              <Activity className="w-10 h-10 text-emerald-400 animate-pulse" />
            ) : (
              <PhoneOff className="w-10 h-10 text-red-400" />
            )}
            {callStatus === 'connected' && (
              <div className="absolute -inset-2 rounded-full border border-sky-400/20 animate-ping pointer-events-none" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{helpline.name}</h3>
            <p className="text-sky-400 font-mono text-base mt-1">{helpline.number}</p>
            <div className="mt-2 text-sm text-slate-300">
              {callStatus === 'connecting' && <span className="text-slate-400">Connecting to Triage Specialist...</span>}
              {callStatus === 'connected' && (
                <span className="font-mono text-emerald-400 font-medium">Connected · Call Duration {formatTime(seconds)}</span>
              )}
              {callStatus === 'ended' && <span className="text-red-400">Call Terminated</span>}
            </div>
          </div>

          {callStatus === 'connected' && (
            <div className="space-y-4">
              {/* Operator badge */}
              <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700 text-left text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-semibold text-white">Registered Nurse Triage Officer:</span>
                  <span className="text-sky-400 font-mono">RN-8841</span>
                </div>
                <p className="text-slate-400">
                  "Hello, this is MedFly Medical Helpline. I am a licensed triage nurse. Are you in a safe location?"
                </p>
              </div>

              {/* Live Location telemetry note */}
              <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/40 px-3 py-2 rounded-lg border border-slate-800">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>GPS Incident Coordinates Sent</span>
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">37.7749° N, 122.4194° W</span>
              </div>

              {/* Triage Guidance Checklist */}
              <div className="text-left bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Emergency Assessment Protocol:</span>
                {triageDirectives.map((dir, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${idx <= triageStep ? 'text-sky-400' : 'text-slate-600'}`} />
                    <span>{dir}</span>
                  </div>
                ))}
                {triageStep < triageDirectives.length - 1 && (
                  <button
                    onClick={() => setTriageStep(triageStep + 1)}
                    className="mt-2 text-xs text-sky-400 hover:text-sky-300 underline block cursor-pointer"
                  >
                    Proceed to Next Assessment Step →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-colors ${
                isMuted ? 'bg-amber-600/30 text-amber-400' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            <button
              onClick={handleEndCall}
              className="p-5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              title="End Call"
            >
              <PhoneOff className="w-7 h-7" />
            </button>

            <button
              onClick={() => alert('Speaker volume maximized for hands-free emergency communication.')}
              className="p-4 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Speakerphone"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="p-3 bg-slate-950 text-center text-[11px] text-slate-400 border-t border-slate-800">
          Emergency tele-triage is provided under clinical protocols overseen by Board-Certified Emergency Physicians.
        </div>
      </div>
    </div>
  );
};
