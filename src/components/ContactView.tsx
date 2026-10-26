import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Building2, HelpCircle, Navigation } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'General Patient Inquiry',
    message: '',
    urgency: 'Routine (Reply within 24 business hours)',
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const departments = [
    {
      name: 'Emergency & Acute Trauma Care',
      phone: '(555) 234-8000 (Ext. 1)',
      email: 'emergency@medflyhealth.org',
      hours: '24 Hours / 7 Days',
      location: 'Ground Floor, North Pavilion Canopy',
    },
    {
      name: 'Outpatient Appointments & Referrals',
      phone: '(555) 234-8020 (Ext. 2)',
      email: 'appointments@medflyhealth.org',
      hours: '7:30 AM – 6:00 PM Mon-Fri',
      location: 'Rotunda Building, 2nd Floor Suite 200',
    },
    {
      name: 'Patient Billing & Health Insurance',
      phone: '(555) 234-8055 (Ext. 3)',
      email: 'billing@medflyhealth.org',
      hours: '8:00 AM – 5:00 PM Mon-Fri',
      location: 'Financial Advocacy Center, 1st Floor',
    },
    {
      name: 'Health Records & HIPAA Releases',
      phone: '(555) 234-8090 (Ext. 4)',
      email: 'him-records@medflyhealth.org',
      hours: '8:00 AM – 4:30 PM Mon-Fri',
      location: 'Clinical Archives, Lower Level B',
    },
    {
      name: 'International & Language Services',
      phone: '(555) 234-8077 (Ext. 5)',
      email: 'globalcare@medflyhealth.org',
      hours: '24/7 Translation Operators On-Demand',
      location: 'Patient Hospitality Lounge, Main Tower',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) return;

    const code = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingId(code);
    setSubmitted(true);
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
              <span>Direct Communication</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Patient & Clinician Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
              Contact Med<span className="text-blue-700">Fly</span> Health System
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Reach clinical departments, coordinate physician referrals, speak with billing advocates, or plan your clinic arrival with our <span className="bg-sky-100/90 text-blue-950 font-semibold px-2 py-0.5 rounded border border-sky-200">24/7 patient support team</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Department Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Send an Inquiry</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Patient Message & Consultation Request
              </h2>
              <p className="text-xs text-slate-500">
                Non-emergency clinical inquiries will be routed to the appropriate department coordinator.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-blue-50 rounded-2xl border border-blue-200 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Received</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your inquiry has been logged under reference tracking ticket{' '}
                  <strong className="text-blue-800 font-mono">{trackingId}</strong>. A department representative will reply to {formData.email} within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      department: 'General Patient Inquiry',
                      message: '',
                      urgency: 'Routine (Reply within 24 business hours)',
                    });
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Rachel"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Thorne"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patient@example.com"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Target Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General Patient Inquiry">General Patient Inquiry</option>
                      <option value="Appointments & Scheduling">Appointments & Scheduling</option>
                      <option value="Billing & Health Insurance">Billing & Health Insurance</option>
                      <option value="Medical Records (HIPAA)">Medical Records & Release</option>
                      <option value="Patient Advocacy / Ombudsman">Patient Rights & Advocacy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Inquiry Urgency</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Routine (Reply within 24 business hours)">Routine (Within 24 Hours)</option>
                      <option value="Priority Care Follow-Up (Within 4 Hours)">Priority Follow-Up (Within 4 Hours)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your inquiry, preferred physician, or appointment timeline..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Confidential Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Department Phone Extensions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Telephone Directory</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Hospital Direct Extensions
              </h2>
            </div>

            <div className="space-y-3">
              {departments.map((dept, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-sky-300 transition-colors">
                  <h4 className="text-xs font-bold text-slate-900">{dept.name}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-blue-700">{dept.phone}</span>
                    <span className="text-slate-400 text-[11px]">{dept.hours}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{dept.location}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gradient-to-br from-slate-50 to-sky-50/70 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>Directions & Transit Guidance</span>
              </div>
              <p>
                Metro Blue Line: Exit at <em>Wellness Plaza Station</em>. Buses #42 and #108 stop directly outside the Main Entrance Rotunda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
