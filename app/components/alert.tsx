"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

import { cn } from "./button";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-500/50 text-green-600 dark:text-green-500 [&>svg]:text-green-600",
        warning: "border-yellow-500/50 text-yellow-600 dark:text-yellow-500 [&>svg]:text-yellow-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const icons = {
  default: AlertCircle,
  destructive: XCircle,
  success: CheckCircle2,
  warning: AlertCircle,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ComponentType<{ className?: string }>;
  onClose?: () => void;
}

const Alert = React.forwardRef<
  HTMLDivElement,
  AlertProps
>(({ className, variant = "default", icon, children, onClose, ...props }, ref) => {
  const Icon = icon || icons[variant || "default"];

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant }),
        "flex items-start gap-4",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto -mr-2 h-6 w-6 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close alert"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };