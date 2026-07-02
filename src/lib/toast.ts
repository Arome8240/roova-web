import { toast } from "sonner";

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg = "Something went wrong. Please try again.") => toast.error(msg),
  promise: <T>(
    p: Promise<T>,
    msgs: { loading: string; success: string; error: string },
  ) => toast.promise(p, msgs),
};
