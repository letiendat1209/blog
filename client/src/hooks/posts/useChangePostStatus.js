import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePostStatus } from "@/services/post.service";

export const useChangePostStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: changePostStatus,
    onSuccess: (_, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  return {
    changeStatus: mutation.mutate,
    changeStatusAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
