import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export function BrandMark({ alt = "Kamolpop monogram", ...props }: Props) {
  return <img {...props} src="/brand/kv-monogram-light.png" alt={alt} data-logo-variant="light" />;
}
