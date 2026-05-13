import * as React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <hr
      ref={ref}
      role="separator"
      aria-orientation={orientation === "vertical" ? "vertical" : undefined}
      data-orientation={orientation}
      className={cn(
        "shrink-0 border-0 bg-zinc-200 dark:bg-zinc-700",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
