import { NotificationContext } from "@/context/NotificationContext";
import { NotificationContextType } from "@/types/types";
import { useContext } from "react";

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};
