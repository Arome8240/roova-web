import { z } from "zod";
import { simulateNetwork } from "@/lib/simulate";
import type {
  LoginInput,
  SignupInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "@/features/auth/schemas";

const authResponseSchema = z.object({
  userId: z.string(),
  email: z.string(),
});
export type AuthResponse = z.infer<typeof authResponseSchema>;

const okResponseSchema = z.object({ ok: z.literal(true) });

export async function login(input: LoginInput): Promise<AuthResponse> {
  const res = await simulateNetwork({ userId: "usr_demo", email: input.email });
  return authResponseSchema.parse(res);
}

export async function signup(input: SignupInput): Promise<AuthResponse> {
  const res = await simulateNetwork({ userId: "usr_demo", email: input.email });
  return authResponseSchema.parse(res);
}

export async function requestPasswordReset(input: ForgotPasswordInput) {
  const res = await simulateNetwork({ ok: true as const, email: input.email });
  return okResponseSchema.parse(res);
}

export async function resetPassword(input: ResetPasswordInput) {
  const res = await simulateNetwork({ ok: true as const, token: input.token });
  return okResponseSchema.parse(res);
}
