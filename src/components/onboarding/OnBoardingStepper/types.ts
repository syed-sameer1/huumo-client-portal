export interface FooterProps {
  showBack: boolean;
  onNextStep: () => void;
  onBackStep: () => void;
  loading: boolean;
  /** Hide primary onboarding CTA (e.g. PO step uses its own Continue). */
  showSaveAndContinue?: boolean;
}
