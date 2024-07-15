import { MessageContext } from "@/context/MessageContext";
import { MessageContextType } from "@/types/types";
import { useContext } from "react";

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};
