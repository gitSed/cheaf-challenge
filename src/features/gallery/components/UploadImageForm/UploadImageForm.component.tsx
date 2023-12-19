import { FormEvent, useRef } from "react";
import { Flex, Icon, IconButton, Input } from "@chakra-ui/react";

import { UploadIcon } from "@/features/shared/icons";

import { UploadImageFormProps } from "./UploadImageForm.types";

function UploadImageForm(props: UploadImageFormProps) {
  const { onUpload, isUploading } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files) return;

    onUpload(files[0]);
  };

  const handleButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    inputRef.current?.click();
  };

  return (
    <Flex
      as="form"
      w="100%"
      flexDir="column"
      gap="1.5rem"
      onSubmit={handleSubmit}
    >
      <Input
        ref={inputRef}
        type="file"
        display="none"
        name="file"
        id="upload-file"
        aria-label="Upload Image"
        onChange={handleOnChange}
      />
      <IconButton
        isRound
        aria-label="Upload Image"
        variant="solid"
        size="lg"
        colorScheme="blue"
        isLoading={isUploading}
        icon={<Icon as={UploadIcon} boxSize={6} />}
        onClick={handleButtonClick}
      />
    </Flex>
  );
}

export default UploadImageForm;
