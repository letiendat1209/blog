import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/post.service";

export const usePosts = ({
  status = "PUBLISHED",
  tags = [],
  featured,
  limit,
} = {}) => {
  const query = useQuery({
    queryKey: [
      "posts",
      status,
      featured ?? "all",
      tags.join(","),
      limit ?? "all",
    ],
    queryFn: () =>
      getPosts({
        status,
        tags,
        featured,
        limit,
      }),
  });

  return {
    posts: query.data?.data || [],
    loading: query.isLoading,
  };
};


export const useAdminPosts = ({ status, tags, page = 1, limit = 20 } = {}) => {
  const query = useQuery({
    queryKey: ["admin-posts", status, tags?.join(","), page, limit],
    queryFn: () =>
      getPosts({
        status, // undefined = lấy hết
        tags,
        page,
        limit,
      }),
  });

  return {
    posts: query.data?.data || [],
    pagination: query.data?.pagination,
    loading: query.isLoading,
    refetch: query.refetch,
  };
};
