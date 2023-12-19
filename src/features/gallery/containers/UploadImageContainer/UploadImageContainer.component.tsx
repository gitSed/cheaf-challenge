import { useEffect } from "react";

import { Box } from "@chakra-ui/react";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

import { useFirebase } from "@/features/shared/hooks";
import { uploadFileUseCase } from "@/domain/gallery/application";
import { GalleryImage } from "@/domain/gallery/domain/entities";

import { UploadImageForm } from "../../components";
import { UploadImageContainerProps } from "./UploadImageContainer.types";

function UploadImageContainer(props: UploadImageContainerProps) {
  const { fetcher, repository, imagesTag, onImagesByTagLoaded } = props;

  const { subscribeToCollectionChanges } = useFirebase();

  const {
    error,
    isError,
    isLoading: isLoadingUploadFile,
    isSuccess: isSuccessUploadFile,
    mutate,
  } = fetcher.uploadFileMutation(uploadFileUseCase(repository));

  function getImageTypeFromBase64(base64String: string): string | null {
    const matches = base64String.match(/^data:(image\/[a-zA-Z+]+);base64,/);

    if (matches && matches.length > 1) {
      return matches[1];
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (!!imagesTag === false) return;

    const callback = (
      querySnapshot: QuerySnapshot<DocumentData, DocumentData>
    ) => {
      const images: Array<GalleryImage> = querySnapshot.docs.map((doc) => {
        const { file, tag, type, description } = doc.data();

        const imageType = type || getImageTypeFromBase64(file);

        return {
          id: doc.id,
          link: file,
          title: `${tag} - ${description || ""}`,
          type: imageType,
          height: 0,
          width: 0,
        };
      });

      onImagesByTagLoaded(images);
    };

    const unsubscribe = subscribeToCollectionChanges(
      "images",
      ["tag", "==", imagesTag],
      callback
    );

    return () => unsubscribe();
  }, [imagesTag]);

  const handleUploadFile = async (file: File) => {
    mutate({
      file: file,
      fileName: file.name,
      tag: imagesTag || "",
      description: "",
      type: file.type,
    });
  };

  return (
    <Box position="fixed" bottom="1.5rem" right="1.5rem">
      <UploadImageForm onUpload={handleUploadFile} />
    </Box>
  );
}

export default UploadImageContainer;
