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

export interface StatCardItem{
    title: string,
    value: number,
    prefix: string,
}

export interface NetworkCollectionStat{
    network: string,
    logo: string,
    today: number,
    allTime: number,
}