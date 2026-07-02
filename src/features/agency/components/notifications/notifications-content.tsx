"use client";

import { CheckCheck, Bell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { NOTIFICATION_ICON } from "@/features/agency/components/notification-icon";
import { useNotifications } from "@/features/agency/queries";
import { useMarkAllNotificationsRead, useMarkNotificationRead } from "@/features/agency/mutations";
import { cn } from "@/lib/utils";

export function NotificationsContent() {
  const { data, isPending, isError, refetch } = useNotifications();
  const markAllRead = useMarkAllNotificationsRead();
  const markRead = useMarkNotificationRead();

  const unreadCount = data?.filter((n) => !n.read).length ?? 0;

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button size="sm" variant="outline" onClick={() => markAllRead.mutate()}>
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </Button>
        </div>
      )}

      {isPending && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && data.length === 0 && (
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="You'll see updates about your listings here."
        />
      )}

      {data && data.length > 0 && (
        <div className="space-y-2">
          {data.map((notification) => {
            const { icon: Icon, className } = NOTIFICATION_ICON[notification.type];
            return (
              <button
                key={notification.id}
                onClick={() => !notification.read && markRead.mutate(notification.id)}
                className={cn(
                  "shadow-soft flex w-full items-start gap-3 rounded-2xl bg-card p-4 text-left transition-colors",
                  !notification.read && "bg-primary/5",
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    className,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{notification.title}</p>
                    {!notification.read && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
