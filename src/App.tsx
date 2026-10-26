import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { HelplineView } from './components/HelplineView';
import { QuickCareView } from './components/QuickCareView';
import { FacilitiesView } from './components/FacilitiesView';
import { ContactView } from './components/ContactView';
import { EboltAuthPage, UserSession } from './components/EboltAuthPage';
import { PatientDashboardModal } from './components/PatientDashboardModal';
import { CallSimulationModal } from './components/CallSimulationModal';
import { BookingModal } from './components/BookingModal';
import { HELPLINE_DATA, HelplineItem, DEMO_PATIENT } from './data/medicalData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [session, setSession] = useState<UserSession | null>(null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [activeHelpline, setActiveHelpline] = useState<HelplineItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingFacilityId, setBookingFacilityId] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore session from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('medfly_user_session') || localStorage.getItem('apexcare_user_session');
      if (saved) {
        setSession(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
    try {
      localStorage.setItem('medfly_user_session', JSON.stringify(newSession));
    } catch {
      // Ignore storage errors
    }
    setToastMessage(`Welcome back, ${newSession.name}!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSignOut = () => {
    const prevName = session?.name;
    setSession(null);
    setIsDashboardModalOpen(false);
    try {
      localStorage.removeItem('medfly_user_session');
      localStorage.removeItem('apexcare_user_session');
    } catch {
      // Ignore storage errors
    }
    setToastMessage(prevName ? `Logged out from ${prevName} successfully.` : 'Logged out successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTriggerSOS = () => {
    setActiveHelpline(HELPLINE_DATA[0]);
    setIsCallModalOpen(true);
  };

  const handleCallHelpline = (item: HelplineItem) => {
    setActiveHelpline(item);
    setIsCallModalOpen(true);
  };

  const handleCallCustomNumber = (phone: string, name: string) => {
    setActiveHelpline({
      id: 'custom-call',
      name,
      number: phone,
      category: 'Emergency',
      availability: '24/7 Operator on Standby',
      avgResponseSeconds: 10,
      description: `Direct hospital operator line to ${name}.`,
      priority: 'HIGH',
    });
    setIsCallModalOpen(true);
  };

  const handleOpenBooking = (facilityId?: string) => {
    setBookingFacilityId(facilityId);
    setIsBookingModalOpen(true);
  };

  const handleAppointmentSuccess = (newApt: any) => {
    if (session && session.role === 'patient') {
      const prevApts = (session.details as any)?.upcomingAppointments || [];
      const updatedSession: UserSession = {
        ...session,
        details: {
          ...session.details,
          upcomingAppointments: [newApt, ...prevApts],
        } as any,
      };
      setSession(updatedSession);
      try {
        localStorage.setItem('medfly_user_session', JSON.stringify(updatedSession));
      } catch {
        // ignore
      }
    }
    setToastMessage(`Spot confirmed: ${newApt.doctor} on ${newApt.date} at ${newApt.time}!`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar with Top Right Login Icon */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        session={session}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onOpenDashboard={() => setIsDashboardModalOpen(true)}
        onSignOut={handleSignOut}
        onTriggerSOS={handleTriggerSOS}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={setActiveTab}
            onCallHelpline={handleCallHelpline}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {activeTab === 'about' && (
          <AboutView
            onNavigate={setActiveTab}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {activeTab === 'helpline' && (
          <HelplineView onCallHelpline={handleCallHelpline} />
        )}
        {activeTab === 'quick-care' && (
          <QuickCareView
            onNavigate={setActiveTab}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {activeTab === 'facilities' && (
          <FacilitiesView
            onOpenBookingWithFacility={(facId) => handleOpenBooking(facId)}
            onCallNumber={handleCallCustomNumber}
          />
        )}
        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onTriggerSOS={handleTriggerSOS}
      />

      {/* Ebolt Profile & Auth Page (Matches screenshot when profile icon is clicked) */}
      <EboltAuthPage
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentSession={session}
        onSignOut={handleSignOut}
        onOpenDashboard={() => {
          setIsAuthModalOpen(false);
          setIsDashboardModalOpen(true);
        }}
      />

      {/* Patient Dashboard / Clinical Management */}
      {session && (
        <PatientDashboardModal
          isOpen={isDashboardModalOpen}
          onClose={() => setIsDashboardModalOpen(false)}
          session={session}
          onSignOut={handleSignOut}
          onOpenBooking={() => {
            setIsDashboardModalOpen(false);
            handleOpenBooking();
          }}
        />
      )}

      {/* Emergency Call Simulation */}
      <CallSimulationModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        helpline={activeHelpline}
      />

      {/* Appointment Booking */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultFacilityId={bookingFacilityId}
        initialPatientName={session?.name || ''}
        onSuccessBooking={handleAppointmentSuccess}
        onOpenDashboard={() => {
          if (!session) {
            // Auto login as demo patient so user can view appointment
            const patientSession: UserSession = {
              role: 'patient',
              name: 'Sarah Miller',
              email: 'sarah.miller@patient.medflyhealth.org',
              details: {
                ...DEMO_PATIENT,
                upcomingAppointments: [
                  {
                    id: 'apt-new',
                    doctor: 'Dr. Sarah Jenkins, MD',
                    type: 'Reserved Priority Visit',
                    specialty: 'Clinical Consultation',
                    date: 'Tomorrow, Oct 27, 2026',
                    time: '09:30 AM',
                    location: 'MedFly Metropolitan Medical Pavilion',
                    status: 'Confirmed',
                  },
                  ...DEMO_PATIENT.upcomingAppointments,
                ],
              },
            };
            setSession(patientSession);
          }
          setIsBookingModalOpen(false);
          setIsDashboardModalOpen(true);
        }}
      />

      {/* Floating 24/7 Priority Emergency Speed-Dial */}
      <div className="fixed bottom-6 left-6 z-30 hidden sm:flex items-center gap-2">
        <button
          onClick={handleTriggerSOS}
          className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xl shadow-red-500/25 border border-red-400/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          title="Direct 1-Tap Priority 911 Triage Call"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
          <span>Priority Emergency Call</span>
        </button>
      </div>

      {/* Floating 1-Click Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
