export interface LoginCredentials {
    email: string,
    password: string,
}
export interface ForgotPasswordData {
    email: string,
}

export interface ResetPasswordData {
    newPassword: string,
    resetToken: string,
}

export interface SummaryStats {
    colTodayCount: string |number;
    colTodayAmt: string | number;
    colTotalCount: string | number;
    colTotalAmt: string | number;
    disTodayCount: string | number;
    disTodayAmt: string | number;
    disTotalCount: string | number;
    disTotalAmt: string | number;
}
export interface SummaryStatItem{
    title: string,
    value: number,
    prefix: string,
}

export interface NetworkCollectionStat{
    network: "MTN-MoMo" | "T-Cash" | "AT-Cash",
    logo: string,
    today: number,
    allTime: number,
}

/* Notification context */
export type NotificationType = "success" | "info" | "warning" | "error";

export interface NotificationContextType {
  openNotification: (
    type: NotificationType,
    message: string,
    description: string
  ) => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
}

/* Message context type */
type MessageType = "success" | "info" | "warning" | "error" | "loading";

interface MessageContextType {
  openMessage: (
    type: MessageType,
    content: string,
    duration?: number,
  ) => void;
}
