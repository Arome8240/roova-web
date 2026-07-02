import { useMutation } from "@tanstack/react-query";
import { login, signup, requestPasswordReset, resetPassword } from "@/features/auth/api";
import { notify } from "@/lib/toast";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: () => notify.success("Welcome back."),
    onError: () => notify.error("Couldn't log you in. Check your details and try again."),
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => notify.success("Account created."),
    onError: () => notify.error("Couldn't create your account. Please try again."),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => notify.success("Reset link sent — check your email."),
    onError: () => notify.error(),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => notify.success("Password updated."),
    onError: () => notify.error(),
  });
}
