import React, { useState } from "react";
import useDialogState from "@/hooks/UI/use-dialog-state";

const UsersContext = React.createContext(null);

export function UsersProvider({ children }) {
  const [open, setOpen] = useDialogState(null);
  const [currentRow, setCurrentRow] = useState(null);

  return (
    <UsersContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const context = React.useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used within <UsersProvider>");
  }

  return context;
};
