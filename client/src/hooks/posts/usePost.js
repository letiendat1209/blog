import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPost,
  newPost,
  publishPost,
  archivePost,
  updatePost,
} from "@/services/post.service";

// Hook để lấy chi tiết một post
export const usePost = (id) => {
  const query = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });

  return {
    post: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

// Hook để tạo post mới
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: newPost,
    onSuccess: () => {
      // Invalidate và refetch danh sách posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    createPost: mutation.mutate,
    createPostAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Hook để publish post
export const usePublishPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: publishPost,
    onSuccess: (data, id) => {
      // Invalidate danh sách posts và post chi tiết
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  return {
    publishPost: mutation.mutate,
    publishPostAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Hook để archive post
export const useArchivePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: archivePost,
    onSuccess: (data, id) => {
      // Invalidate danh sách posts và post chi tiết
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  return {
    archivePost: mutation.mutate,
    archivePostAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Hook để update post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updatePost(id, data),
    onSuccess: (data, variables) => {
      // Invalidate danh sách posts và post chi tiết
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
    },
  });

  return {
    updatePost: mutation.mutate,
    updatePostAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
