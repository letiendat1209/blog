import React, { useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";

const PostsContext = React.createContext(null);

export function PostsProvider({ children }) {
  const [open, setOpen] = useDialogState(null);
  const [currentRow, setCurrentRow] = useState(null);

  return (
    <PostsContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => {
  const context = React.useContext(PostsContext);

  if (!context) {
    throw new Error("usePosts must be used within <PostsProvider>");
  }

  return context;
};
