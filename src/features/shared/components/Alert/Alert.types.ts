export interface AlertProps {
  duration?: number;
  message: string | null;
  status: "info" | "warning" | "success";
  onDismiss?: () => void;
}
