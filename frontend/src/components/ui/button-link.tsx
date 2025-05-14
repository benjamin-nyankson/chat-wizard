import * as React from "react";
import { Link, type LinkProps } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps
  extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  to: LinkProps["to"];
  replace?: LinkProps["replace"];
  state?: LinkProps["state"];
  className?: string;
  children?: React.ReactNode;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ to, replace, state, className, variant, size, asChild = false, children, ...rest }, ref) => {
    const classNames = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      return (
        <Slot ref={ref} className={classNames} {...rest}>
          {children}
        </Slot>
      );
    }

    return (
      <Link
        to={to}
        replace={replace}
        state={state}
        ref={ref}
        className={classNames}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

export { LinkButton };
