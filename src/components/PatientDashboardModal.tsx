import React, { useState } from 'react';
import { X, Calendar, Pill, FileText, AlertTriangle, ShieldCheck, Clock, CheckCircle2, ChevronRight, Download, UserCheck } from 'lucide-react';
import { DEMO_PATIENT } from '../data/medicalData';
import { UserSession } from './AuthModal';

interface PatientDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: UserSession;
  onSignOut: () => void;
  onOpenBooking: () => void;
}

export const PatientDashboardModal: React.FC<PatientDashboardModalProps> = ({
  isOpen,
  onClose,
  session,
  onSignOut,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'medications' | 'labs'>('overview');
  const [refillStatus, setRefillStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const isDoctor = session.role === 'doctor';
  const patient = session.role === 'patient' && typeof session.details === 'object' && 'dob' in session.details
    ? session.details
    : DEMO_PATIENT;

  const [appointmentsList, setAppointmentsList] = useState(patient.upcomingAppointments);
  const [prescriptionsList, setPrescriptionsList] = useState(patient.activePrescriptions);
  const [inAppNotice, setInAppNotice] = useState<string | null>(null);

  const handleRequestRefill = (rxName: string) => {
    setPrescriptionsList((prev) =>
      prev.map((rx) =>
        rx.name === rxName ? { ...rx, remainingRefills: Math.max(0, rx.remainingRefills - 1) } : rx
      )
    );
    setInAppNotice(`Refill order for ${rxName} submitted to MedFly Central Pharmacy. Ready for pickup in 45 minutes.`);
    setTimeout(() => setInAppNotice(null), 4000);
  };

  const handleCancelAppointment = (aptId: string, docName: string) => {
    setAppointmentsList((prev) => prev.filter((a) => a.id !== aptId));
    setInAppNotice(`Appointment with ${docName} has been canceled. Slot released to clinic queue.`);
    setTimeout(() => setInAppNotice(null), 4000);
  };

  const handleDownloadLab = (testName: string) => {
    setInAppNotice(`Encrypted medical report downloaded: ${testName} (PDF)`);
    setTimeout(() => setInAppNotice(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600/30 text-sky-400 border border-blue-500/40 flex items-center justify-center font-bold text-lg">
              {session.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">{session.name}</h2>
                <span className="text-xs text-sky-300 font-medium bg-blue-950/80 px-2 py-0.5 rounded border border-blue-700/50">
                  {isDoctor ? 'Verified Staff Physician' : 'Verified Patient ID'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isDoctor ? 'MedFly Medical Staff Portal · On-Call Duty' : `${patient.email} · DOB: ${patient.dob}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="px-3 py-1.5 text-xs text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-lg transition-colors border border-rose-800/40 font-medium cursor-pointer"
            >
              Sign Out
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Health Overview & ICE Card
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'appointments'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Appointments ({appointmentsList.length})
          </button>
          <button
            onClick={() => setActiveTab('medications')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'medications'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Prescriptions ({prescriptionsList.length})
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'labs'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Diagnostic Lab Results
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {inAppNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center justify-between gap-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{inAppNotice}</span>
              </div>
              <button onClick={() => setInAppNotice(null)} className="text-emerald-700 hover:text-emerald-950 font-bold px-1">
                ✕
              </button>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Emergency ICE Medical Badge */}
              <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="text-sm font-bold text-red-900">Emergency Medical Profile (In Case of Emergency)</h3>
                  </div>
                  <span className="text-xs font-semibold text-red-700 bg-white px-2.5 py-1 rounded-md border border-red-200">
                    Paramedic Accessible
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Blood Type</span>
                    <span className="font-bold text-slate-900 text-sm">{patient.bloodType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Known Allergies</span>
                    <span className="font-bold text-red-700">{patient.allergies.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Insurance Plan</span>
                    <span className="font-medium text-slate-900">{patient.insuranceProvider}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Emergency Contact</span>
                    <span className="font-medium text-slate-900">{patient.emergencyContact}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                  <h4 className="text-sm font-semibold text-slate-900">Upcoming Visits</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {appointmentsList.length > 0
                      ? `${appointmentsList[0]?.date} at ${appointmentsList[0]?.time}`
                      : 'No scheduled appointments'}
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book New Appointment</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <Pill className="w-5 h-5 text-blue-600 mb-2" />
                  <h4 className="text-sm font-semibold text-slate-900">Active Prescriptions</h4>
                  <p className="text-xs text-slate-600 mt-1">{prescriptionsList.length} medications on profile</p>
                  <button
                    onClick={() => setActiveTab('medications')}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage Prescriptions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mb-2" />
                  <h4 className="text-sm font-semibold text-slate-900">Primary Hospital</h4>
                  <p className="text-xs text-slate-600 mt-1">{patient.primaryHospital}</p>
                  <span className="mt-3 inline-block text-xs text-slate-500">Record ID: {patient.id}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Scheduled Appointments</h3>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Schedule New Visit
                </button>
              </div>

              {appointmentsList.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                  You have no upcoming appointments scheduled.
                </div>
              ) : (
                appointmentsList.map((apt) => (
                  <div key={apt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{apt.doctor}</span>
                        <span className="text-xs text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded font-medium">{apt.type || 'Clinical Visit'}</span>
                      </div>
                      <p className="text-xs text-slate-600">{apt.specialty}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {apt.time}</span>
                        <span>·</span>
                        <span>{apt.location || 'MedFly Main Pavilion'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setInAppNotice(`Fast-track mobile check-in barcode sent to your phone for ${apt.doctor}.`);
                          setTimeout(() => setInAppNotice(null), 3500);
                        }}
                        className="px-3 py-1.5 text-xs text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Pre-Check In
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(apt.id, apt.doctor)}
                        className="px-3 py-1.5 text-xs text-red-600 hover:text-red-800 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Active Prescriptions & Refill Orders</h3>
                  <p className="text-xs text-slate-500">Filled by MedFly Central 24/7 Clinical Pharmacy</p>
                </div>
              </div>

              {prescriptionsList.map((rx, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{rx.name}</h4>
                      <span className="text-xs text-slate-500 font-mono">({rx.rxNumber})</span>
                    </div>
                    <p className="text-xs text-slate-600">{rx.dosage}</p>
                    <p className="text-xs text-blue-700 font-medium">Refills remaining: {rx.remainingRefills}</p>
                  </div>
                  <button
                    onClick={() => handleRequestRefill(rx.name)}
                    disabled={rx.remainingRefills === 0}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer ${
                      rx.remainingRefills > 0
                        ? 'text-white bg-blue-600 hover:bg-blue-700'
                        : 'text-slate-400 bg-slate-200 cursor-not-allowed'
                    }`}
                  >
                    {rx.remainingRefills > 0 ? '1-Click Refill Request' : 'No Refills Left'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Verified Diagnostic Lab Results</h3>
              {patient.recentLabReports.map((lab, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{lab.test}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Report Date: {lab.date} · {lab.status}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadLab(lab.test)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
