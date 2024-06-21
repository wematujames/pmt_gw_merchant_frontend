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