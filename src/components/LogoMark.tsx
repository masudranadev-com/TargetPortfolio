import { Box } from "lucide-react";

type LogoMarkProps = {
  className?: string;
  size?: number;
};

export function LogoMark({ className, size = 22 }: LogoMarkProps) {
  return (
    <span className={className} aria-hidden="true">
      <Box size={size} strokeWidth={3} />
    </span>
  );
}
