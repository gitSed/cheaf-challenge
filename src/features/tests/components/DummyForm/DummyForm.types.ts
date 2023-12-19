import { z } from "zod";

export interface DummyFormProps {
  children: React.ReactNode | React.ReactNode[];
  initialValues: Record<string, any>;
  validationSchema: z.ZodObject<any, any>;
  onSubmit: (values: any) => void;
}
