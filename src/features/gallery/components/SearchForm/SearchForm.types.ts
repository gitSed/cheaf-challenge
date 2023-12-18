import { Search } from "@/domain/gallery/domain/entities";

export interface SearchFormProps {
  initialValues: Search;
  isSubmitting: boolean;
  isSuccess: boolean;
  onSubmit: (values: Search) => void;
}
