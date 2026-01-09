"use client";

import { useEffect, useState } from "react";
import http from "../lib/http";

export const useGetAllTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    http
      .get("/tags")
      .then((res) => {
        if (mounted) setTags(res.data);
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { tags, loading };
};
