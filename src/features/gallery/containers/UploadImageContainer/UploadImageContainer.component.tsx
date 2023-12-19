import { useCallback, useEffect, useRef } from "react";

import { Box, ToastId, useToast } from "@chakra-ui/react";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

import { useFirebase } from "@/features/shared/hooks";
import { Alert } from "@/features/shared/components";
import { uploadFileUseCase } from "@/domain/gallery/application";
import { GalleryImage } from "@/domain/gallery/domain/entities";

import { UploadImageForm } from "../../components";
import { UploadImageContainerProps } from "./UploadImageContainer.types";

const TOAST_DURATION = 40000;

function UploadImageContainer(props: UploadImageContainerProps) {
  const { fetcher, repository, imagesTag, onUserImagesLoaded } = props;

  const toastIdRef = useRef<ToastId>();
  const { subscribeToCollectionChanges } = useFirebase();

  const {
    isError: isErrorUploadFile,
    isLoading: isLoadingUploadFile,
    isSuccess: isSuccessUploadFile,
    mutate,
  } = fetcher.uploadFileMutation(uploadFileUseCase(repository));

  const toast = useToast({
    position: "bottom",
    duration: TOAST_DURATION,
  });

  const closeToast = useCallback(() => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }, [toastIdRef, toast]);

  const showToast = useCallback(
    (status: "info" | "warning" | "success", message: string) => {
      toastIdRef.current = toast({
        render: () => {
          return (
            <Alert message={message} status={status} onDismiss={closeToast} />
          );
        },
      });
    },
    [toastIdRef, toast]
  );

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

    const callbackTriggeredByCollectionChanges = (
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

      onUserImagesLoaded(images);
    };

    const unsubscribe = subscribeToCollectionChanges(
      "images",
      ["tag", "==", imagesTag],
      callbackTriggeredByCollectionChanges
    );

    return () => unsubscribe();
  }, [imagesTag]);

  useEffect(() => {
    if (isSuccessUploadFile) {
      showToast("success", "Image uploaded successfully!");
    }

    if (isErrorUploadFile) {
      showToast(
        "warning",
        "There was an error while uploading your image. Please try again."
      );
    }
  }, [isSuccessUploadFile, isErrorUploadFile]);

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
      <UploadImageForm
        isUploading={isLoadingUploadFile}
        onUpload={handleUploadFile}
      />
    </Box>
  );
}

export default UploadImageContainer;
