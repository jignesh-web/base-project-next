import { getNestedValue } from "@/utils";
import React from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { cn } from "@/utils/common.utils";

export type PrimaryInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  defaultValue?: string;
  description?: string;
  error?: string;
  type: "text" | "number" | "password";
  name: string;
  registerOptions?: RegisterOptions<FieldValues, string>;
};

const PrimaryInput = React.forwardRef<HTMLInputElement, PrimaryInputProps>(
  (
    {
      title,
      defaultValue,
      description,
      type,
      name,
      registerOptions,
      className,
      ...restProps
    },
    ref
  ) => {
    const id = React.useId();
    const { register, formState } = useFormContext() || {};
    const elementRegistration =
      register?.(name, { ...registerOptions, value: defaultValue }) || {};

    const { errors } = formState || {};
    const errorMessage = getNestedValue(errors || {}, `${name}.message`);

    return (
      <div className="flex flex-col">
        {title && <label htmlFor={id}>{title}</label>}
        <input
          id={id}
          type={type}
          className={cn(
            "bg-transparent file:bg-transparent flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...(type === "password" ? { autoComplete: "off" } : {})}
          {...restProps}
          {...elementRegistration}
          {...(ref ? { ref } : {})}
        />
        {description && <span className="mt-1 text-xs">{description}</span>}
        {errorMessage && (
          <span className="mt-1 text-xs text-destructive">{errorMessage}</span>
        )}
      </div>
    );
  }
);

PrimaryInput.displayName = "PrimaryInput";

export { PrimaryInput };
