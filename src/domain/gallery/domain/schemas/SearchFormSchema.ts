import { z } from "zod";

const SearchFormSchema = z.object({
  term: z.string().min(3, "La búsqueda debe tener al menos 3 caracteres"),
});

export default SearchFormSchema;
