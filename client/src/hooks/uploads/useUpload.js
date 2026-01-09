import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/services/upload.service";

export const useUploadImage = () => {
  const {
    mutateAsync: uploadImageAsync,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: uploadImage,
  });

  return {
    uploadImage: uploadImageAsync,
    isLoading,
    error,
  };
};
