import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, ShieldCheck, CheckCircle2, ChevronRight, X, Activity, Filter, Compass } from 'lucide-react';
import { FACILITIES_DATA, Facility } from '../data/medicalData';

interface FacilitiesViewProps {
  onOpenBookingWithFacility: (facilityId: string) => void;
  onCallNumber: (phone: string, name: string) => void;
}

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({ onOpenBookingWithFacility, onCallNumber }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [only247, setOnly247] = useState(false);
  const [selectedFacilityModal, setSelectedFacilityModal] = useState<Facility | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  const facilityTypes = ['All', 'Trauma Center', 'General Hospital', 'Urgent Care', 'Diagnostic Center', 'Pharmacy'];

  const filteredFacilities = FACILITIES_DATA.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      facility.equipment.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || facility.type === selectedType;
    const matches247 = !only247 || facility.emergencyOpen;

    return matchesSearch && matchesType && matches247;
  });

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
              <span>Regional Healthcare Network</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>6 State-of-the-Art Facilities</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
              Med<span className="text-blue-700">Fly</span> Medical Facilities Directory
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Explore our accredited <span className="bg-sky-100/90 text-blue-950 font-semibold px-2 py-0.5 rounded border border-sky-200">Level I trauma pavilions</span>, comprehensive community hospitals, same-day urgent care clinics, and specialized imaging laboratories.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search facility name, equipment (e.g. MRI, CT), or specialty..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 24/7 Filter Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 whitespace-nowrap">
              <input
                type="checkbox"
                checked={only247}
                onChange={(e) => setOnly247(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>24/7 Emergency Care Only</span>
            </label>
          </div>

          {/* Type Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
            {facilityTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredFacilities.length} accredited facilities</span>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-blue-700 hover:underline">
              Clear search filter
            </button>
          )}
        </div>
      </section>

      {/* Facilities Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFacilities.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <Activity className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No facilities match your search criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try modifying your query or clearing the active filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setOnly247(false);
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all flex flex-col overflow-hidden"
              >
                {/* Facility Image */}
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {fac.type}
                  </div>
                  {fac.traumaLevel && (
                    <div className="absolute bottom-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {fac.traumaLevel}
                    </div>
                  )}
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-700 font-medium">{fac.openHours}</span>
                      <span className="font-mono font-bold text-slate-700 tabular-nums">★ {fac.rating} ({fac.reviewCount})</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">{fac.name}</h3>

                    <p className="text-xs text-slate-500 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{fac.address}, {fac.city}</span>
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Current Wait</span>
                        <span className="font-extrabold text-blue-800 tabular-nums">~{fac.waitMinutes} mins</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Capacity</span>
                        <span className="font-medium text-slate-800">{fac.bedOccupancy}</span>
                      </div>
                    </div>

                    {/* Key Equipment & Specialties */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-semibold text-slate-500 block">Equipment & Technology:</span>
                      <div className="flex flex-wrap gap-1">
                        {fac.equipment.slice(0, 3).map((eq, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFacilityModal(fac)}
                      className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                    >
                      Facility Info & Directions
                    </button>
                    <button
                      onClick={() => onOpenBookingWithFacility(fac.id)}
                      className="flex-1 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xs transition-colors text-center cursor-pointer"
                    >
                      Book / Check In
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Facility Details Modal */}
      {selectedFacilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">{selectedFacilityModal.type}</span>
                <h3 className="text-lg font-bold text-white">{selectedFacilityModal.name}</h3>
              </div>
              <button
                onClick={() => setSelectedFacilityModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 block">Address & Emergency Intake</span>
                  <p className="font-semibold text-slate-900 text-sm">{selectedFacilityModal.address}</p>
                  <p className="text-slate-500">{selectedFacilityModal.city}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 block">Direct Emergency Operator</span>
                  <p className="font-semibold text-blue-700 text-sm">{selectedFacilityModal.phone}</p>
                  <p className="text-slate-500">Open: {selectedFacilityModal.openHours}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Specialty Clinical Services</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedFacilityModal.specialties.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="text-slate-700">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Diagnostic Technology & Equipment</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFacilityModal.equipment.map((e, i) => (
                    <span key={i} className="px-3 py-1 bg-sky-50 text-blue-800 rounded-md font-medium border border-sky-100">
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-100 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">Visitor & Patient Arrival Guidelines</h4>
                <p className="text-slate-600 leading-relaxed">
                  Dedicated visitor parking is available in Parking Garage B (Valet available at the Main Rotunda entrance). Emergency Department patients may pull directly into the red emergency canopy with immediate triage intake upon entry.
                </p>
              </div>

              {copiedNotice && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{copiedNotice}</span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const text = `${selectedFacilityModal.address}, ${selectedFacilityModal.city}`;
                    try {
                      navigator.clipboard?.writeText(text);
                    } catch {
                      // ignore
                    }
                    setCopiedNotice(`Address & GPS copied to clipboard: ${text}`);
                    setTimeout(() => setCopiedNotice(null), 3500);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Copy GPS Address
                </button>
                <button
                  onClick={() => {
                    const phone = selectedFacilityModal.phone;
                    const name = selectedFacilityModal.name;
                    setSelectedFacilityModal(null);
                    onCallNumber(phone, name);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-blue-800 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors cursor-pointer"
                >
                  Dial Direct Line
                </button>
                <button
                  onClick={() => {
                    const id = selectedFacilityModal.id;
                    setSelectedFacilityModal(null);
                    onOpenBookingWithFacility(id);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Schedule Appointment Here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
