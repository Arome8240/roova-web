import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createListing,
  approveListing,
  rejectListing,
  markListingSold,
  createOffer,
} from "@/features/marketplace/api";
import { marketplaceKeys } from "@/features/marketplace/queries";
import { notify } from "@/lib/toast";

export function useCreateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.listings() });
      notify.success("Listing submitted — it's awaiting review.");
    },
    onError: () => notify.error("Couldn't submit the listing. Please try again."),
  });
}

export function useApproveListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.listings() });
      notify.success("Listing approved — it's now live.");
    },
    onError: () => notify.error("Couldn't approve the listing. Please try again."),
  });
}

export function useRejectListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.listings() });
      notify.success("Listing rejected.");
    },
    onError: () => notify.error("Couldn't reject the listing. Please try again."),
  });
}

export function useMarkListingSold() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markListingSold,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: marketplaceKeys.listings() });
      notify.success("Listing marked as sold.");
    },
    onError: () => notify.error("Couldn't update the listing. Please try again."),
  });
}

export function useCreateOffer() {
  return useMutation({
    mutationFn: createOffer,
    onSuccess: () => notify.success("Your offer was sent — the agency will be in touch."),
    onError: () => notify.error("Couldn't submit your offer. Please try again."),
  });
}
