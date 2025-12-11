import cn from "@/lib/cn";
import { ComponentProps } from "react";

const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: ComponentProps<"hr"> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}) => {
  return (
    <hr
      data-slot="separator"
      data-decorative={decorative}
      data-orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
};

export { Separator };
