import { useEffect, useRef } from "react";
import { trackPostView } from "@/services/post.service";

export const useTrackPostView = (postId) => {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!postId) return;
    if (trackedRef.current) return;

    trackedRef.current = true;

    trackPostView(postId).catch(() => {
      // silent fail, view tracking không được phép phá UX
    });
  }, [postId]);
};
