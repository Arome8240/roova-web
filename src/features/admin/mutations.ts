import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveAgency,
  suspendAgency,
  reactivateAgency,
  approveProperty,
  rejectProperty,
  markNotificationRead,
  markAllNotificationsRead,
  updateAdminSettings,
} from "@/features/admin/api";
import { adminKeys } from "@/features/admin/queries";
import { notify } from "@/lib/toast";
import type { Notification } from "@/features/admin/schemas";

export function useApproveAgency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveAgency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.agencies() });
      queryClient.invalidateQueries({ queryKey: adminKeys.overview() });
      notify.success("Agency approved.");
    },
    onError: () => notify.error("Couldn't approve the agency. Please try again."),
  });
}

export function useSuspendAgency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: suspendAgency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.agencies() });
      notify.success("Agency suspended.");
    },
    onError: () => notify.error("Couldn't suspend the agency. Please try again."),
  });
}

export function useReactivateAgency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reactivateAgency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.agencies() });
      notify.success("Agency reactivated.");
    },
    onError: () => notify.error("Couldn't reactivate the agency. Please try again."),
  });
}

export function useApproveProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.properties() });
      queryClient.invalidateQueries({ queryKey: adminKeys.overview() });
      notify.success("Listing approved — it's now live.");
    },
    onError: () => notify.error("Couldn't approve the listing. Please try again."),
  });
}

export function useRejectProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.properties() });
      queryClient.invalidateQueries({ queryKey: adminKeys.overview() });
      notify.success("Listing rejected.");
    },
    onError: () => notify.error("Couldn't reject the listing. Please try again."),
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: adminKeys.notifications() });
      const previous = queryClient.getQueryData<Notification[]>(adminKeys.notifications());
      queryClient.setQueryData<Notification[]>(adminKeys.notifications(), (old) =>
        old?.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(adminKeys.notifications(), context?.previous);
      notify.error();
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: adminKeys.notifications() }),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: adminKeys.notifications() });
      const previous = queryClient.getQueryData<Notification[]>(adminKeys.notifications());
      queryClient.setQueryData<Notification[]>(adminKeys.notifications(), (old) =>
        old?.map((n) => ({ ...n, read: true })),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(adminKeys.notifications(), context?.previous);
      notify.error();
    },
    onSuccess: () => notify.success("All caught up."),
    onSettled: () => queryClient.invalidateQueries({ queryKey: adminKeys.notifications() }),
  });
}

export function useUpdateAdminSettings() {
  return useMutation({
    mutationFn: updateAdminSettings,
    onSuccess: () => notify.success("Settings saved."),
    onError: () => notify.error("Couldn't save your settings. Please try again."),
  });
}
