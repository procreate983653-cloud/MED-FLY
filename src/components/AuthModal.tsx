import React from 'react';
import { EboltAuthPage, UserSession } from './EboltAuthPage';

export type { UserSession };

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
  currentSession?: UserSession | null;
  onSignOut?: () => void;
  onOpenDashboard?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = (props) => {
  return <EboltAuthPage {...props} />;
};
