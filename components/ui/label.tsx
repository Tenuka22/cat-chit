import cn from "@/lib/cn";
import { ComponentProps } from "react";

export const Label = ({ className, ...props }: ComponentProps<"label">) => {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center text-muted-foreground text-sm gap-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
