import React from "react";
import classNames from "classnames";

/**
 * Reusable Button/Link
 * - if `href` is provided, renders <a>
 * - variants: hero | primary | secondary | subtle | text
 * - sizes: sm | md | lg | none
 */
export default function Button({
  as = "button",
  href,
  type = "button",
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const Comp = href ? "a" : as;

  const base =
    "rounded-[var(--radius-card)] font-medium transition focus:outline-none cursor-pointer";

  const variants = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 ring-1 ring-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600",
    secondary:
      "bg-white text-emerald-900 ring-1 ring-emerald-300 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600",
    subtle:
      "bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-500",
    hero:
      "rounded-2xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white ring-1 ring-white/10 shadow hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0 gap-2 text-base font-semibold",
    text:
      "bg-transparent text-gray-500 hover:text-gray-700 ring-0 focus-visible:ring-0 font-normal px-0 py-0",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-base",
    none: "",
  };

  const classes = classNames(
    block ? "block w-full" : "inline-flex items-center justify-center",
    base,
    size && sizes[size],
    variant && variants[variant],
    className,
    { "opacity-60 pointer-events-none": disabled }
  );

  const propsForAnchor = href ? { href } : { type };

  return (
    <Comp className={classes} {...propsForAnchor} {...rest}>
      {children}
    </Comp>
  );
}
