import React, {
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationContextType {
  openNotification: (
    type: NotificationType,
    message: string,
    description: string
  ) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const openNotification = useCallback<
    NotificationContextType["openNotification"]
  >((type, message, description) => {
    notification[type]({
      message,
      description,
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
