import { LoginCredentials } from "@/domain/auth/domain/entities";

export interface LoginFormProps {
  initialValues: LoginCredentials;
  isSubmitting: boolean;
  isSuccess: boolean;
  onSubmit: (values: LoginCredentials) => void;
}
