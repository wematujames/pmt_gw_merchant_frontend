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