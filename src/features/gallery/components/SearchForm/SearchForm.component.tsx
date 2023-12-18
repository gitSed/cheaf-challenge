import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/features/shared/components";
import { SearchIcon } from "@/features/shared/icons";
import { SearchFormSchema } from "@/domain/gallery/domain/schemas";

import { SearchFormProps } from "./SearchForm.types";

function SearchForm(props: SearchFormProps) {
  const { initialValues, isSubmitting, onSubmit } = props;

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(SearchFormSchema),
    mode: "onChange",
    defaultValues: { ...initialValues },
  });

  return (
    <Flex
      as="form"
      w="100%"
      flexDir="column"
      gap="1.5rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name="term"
        label="Search"
        control={control}
        rightElement={
          <IconButton
            isRound
            type="submit"
            aria-label="search"
            icon={<Icon as={SearchIcon} boxSize={7} />}
            isDisabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
          />
        }
      />
    </Flex>
  );
}

export default SearchForm;
