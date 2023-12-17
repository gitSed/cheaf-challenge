import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().email("Email no válido"),
  password: z
    .string()
    .min(8, "Contraseña demasiado corta")
    .max(50, "Contraseña demasiado larga"),
});

export default LoginFormSchema;
