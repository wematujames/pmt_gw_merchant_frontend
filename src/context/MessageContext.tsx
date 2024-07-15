import React, { createContext, useCallback, ReactNode } from "react";
import { message } from "antd";
import { MessageContextType } from "@/types/types";

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const openMessage = useCallback<MessageContextType["openMessage"]>(
    (type, content, duration) => {
      message[type](content, duration);
    },
    []
  );

  return (
    <MessageContext.Provider value={{ openMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default NotificationProvider;
