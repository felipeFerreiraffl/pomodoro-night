import type { ComponentProps } from "react";
import { type Icon as PhosphorIcon } from "@phosphor-icons/react";

interface IconProps extends Omit<ComponentProps<PhosphorIcon>, "ref"> {
  icon: PhosphorIcon;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}

export default function Icon({
  icon: IconComponent,
  size = 24,
  weight = "regular",
  className = "",
  ...props
}: IconProps) {
  return (
    <IconComponent
      className={className}
      size={size}
      weight={weight}
      {...props}
    />
  );
}
