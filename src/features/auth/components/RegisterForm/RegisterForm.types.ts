import { Lead } from "@/domain/auth/domain/entities";

export interface RegisterFormProps {
  initialValues: Lead;
  isSubmitting: boolean;
  isSuccess: boolean;
  onSubmit: (values: Lead) => void;
}
