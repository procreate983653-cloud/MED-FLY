import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, CheckCircle2, Building, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { FACILITIES_DATA, ON_CALL_DOCTORS } from '../data/medicalData';

export interface BookedAppointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  facility: string;
  visitType: string;
  patientName: string;
  patientPhone: string;
  status: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFacilityId?: string;
  initialPatientName?: string;
  onSuccessBooking?: (newApt: BookedAppointment) => void;
  onOpenDashboard?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultFacilityId,
  initialPatientName = '',
  onSuccessBooking,
  onOpenDashboard,
}) => {
  const [patientName, setPatientName] = useState(initialPatientName);
  const [patientPhone, setPatientPhone] = useState('(555) 349-2190');
  const [selectedFacility, setSelectedFacility] = useState(defaultFacilityId || FACILITIES_DATA[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState(ON_CALL_DOCTORS[0].id);
  const [visitType, setVisitType] = useState<'in-person' | 'telehealth' | 'urgent-walkin'>('in-person');
  const [selectedDate, setSelectedDate] = useState('2026-10-28');
  const [selectedSlot, setSelectedSlot] = useState('09:30 AM');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (defaultFacilityId) {
      setSelectedFacility(defaultFacilityId);
    }
  }, [defaultFacilityId, isOpen]);

  useEffect(() => {
    if (initialPatientName) {
      setPatientName(initialPatientName);
    }
  }, [initialPatientName]);

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    const code = `MF-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmCode(code);
    setConfirmed(true);

    const doc = ON_CALL_DOCTORS.find((d) => d.id === selectedDoctor);
    const fac = FACILITIES_DATA.find((f) => f.id === selectedFacility);

    const newApt: BookedAppointment = {
      id: code,
      doctor: doc ? doc.name : 'Dr. Sarah Jenkins, MD',
      specialty: doc ? doc.specialty : 'Family & Acute Care',
      date: selectedDate,
      time: selectedSlot,
      facility: fac ? fac.name : 'MedFly Medical Facility',
      visitType: visitType === 'urgent-walkin' ? 'Walk-in Priority Hold' : visitType === 'telehealth' ? 'Virtual Video Visit' : 'In-Clinic Consultation',
      patientName,
      patientPhone,
      status: 'Confirmed',
    };

    onSuccessBooking?.(newApt);
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  const handleDownloadTicket = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const availableSlots = ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', '01:30 PM', '02:45 PM', '04:00 PM'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-sky-200" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Schedule Care & Reserve Spot</h2>
              <p className="text-xs text-sky-200">MedFly Integrated Scheduling Network</p>
            </div>
          </div>
          <button onClick={onClose} className="text-sky-200 hover:text-white p-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950">Appointment Confirmed & Reserved</h3>
              <p className="text-xs text-slate-600 mt-1">
                Your priority confirmation pass is <span className="font-mono font-bold text-blue-700">{confirmCode}</span>.
              </p>
              <p className="text-xs text-slate-500 mt-2">
                An SMS confirmation with parking instructions and clinical fast-track check-in barcode has been sent to {patientPhone}.
              </p>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{patientName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-blue-800">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500">Physician:</span>
                <span className="font-semibold text-slate-800">
                  {ON_CALL_DOCTORS.find((d) => d.id === selectedDoctor)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Facility:</span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[240px]">
                  {FACILITIES_DATA.find((f) => f.id === selectedFacility)?.name}
                </span>
              </div>
            </div>

            {downloadSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Appointment Pass & QR Code Downloaded!</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadTicket}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Pass</span>
              </button>

              {onOpenDashboard && (
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    onOpenDashboard();
                  }}
                  className="flex-1 py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded-xl border border-blue-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View in Portal</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            {/* Visit Type Segmented Control */}
            <div className="p-1 bg-slate-100 rounded-lg flex items-center text-xs font-medium">
              <button
                type="button"
                onClick={() => setVisitType('in-person')}
                className={`flex-1 py-2 text-center rounded-md transition-colors ${
                  visitType === 'in-person' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                In-Clinic Visit
              </button>
              <button
                type="button"
                onClick={() => setVisitType('telehealth')}
                className={`flex-1 py-2 text-center rounded-md transition-colors ${
                  visitType === 'telehealth' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Virtual Video Visit
              </button>
              <button
                type="button"
                onClick={() => setVisitType('urgent-walkin')}
                className={`flex-1 py-2 text-center rounded-md transition-colors ${
                  visitType === 'urgent-walkin' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Urgent Walk-in Pass
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Contact</label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Medical Facility</label>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {FACILITIES_DATA.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name} ({fac.city}) - Wait: ~{fac.waitMinutes}m
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Attending Physician / Specialist</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {ON_CALL_DOCTORS.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} · {doc.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Target Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Available Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Chief Complaint / Symptoms</label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe what symptoms you are experiencing..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Confirm Appointment Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
