import { z } from "zod";

const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nombre demasiado corto")
    .max(50, "Nombre demasiado largo"),
  email: z.string().email("Email no válido"),
  password: z
    .string()
    .min(8, "Contraseña demasiado corta")
    .max(50, "Contraseña demasiado larga"),
});

export default RegisterFormSchema;
