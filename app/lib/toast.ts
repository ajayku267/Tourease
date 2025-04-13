"use client";

import { toast as sonnerToast } from "sonner";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastOptions {
  id?: string;
  duration?: number;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

export function toast(
  message: string,
  type: ToastType = "default",
  options?: ToastOptions
) {
  const { id, duration, icon, description, action, cancel, onDismiss, onAutoClose } = options || {};

  switch (type) {
    case "success":
      return sonnerToast.success(message, {
        id,
        duration,
        icon,
        description,
        action,
        cancel,
        onDismiss,
        onAutoClose,
      });
    case "error":
      return sonnerToast.error(message, {
        id,
        duration,
        icon,
        description,
        action,
        cancel,
        onDismiss,
        onAutoClose,
      });
    case "warning":
      return sonnerToast.warning(message, {
        id,
        duration,
        icon,
        description,
        action,
        cancel,
        onDismiss,
        onAutoClose,
      });
    case "info":
      return sonnerToast.info(message, {
        id,
        duration,
        icon,
        description,
        action,
        cancel,
        onDismiss,
        onAutoClose,
      });
    default:
      return sonnerToast(message, {
        id,
        duration,
        icon,
        description,
        action,
        cancel,
        onDismiss,
        onAutoClose,
      });
  }
}

export function dismissToast(toastId?: string) {
  sonnerToast.dismiss(toastId);
}

export function clearToasts() {
  sonnerToast.dismiss();
}

export const useToast = () => {
  return {
    toast,
    dismiss: dismissToast,
    clear: clearToasts,
  };
}; 