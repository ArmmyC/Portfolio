import { useTheme } from "next-themes";
import { useEffect, useState, type ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export function BrandMark({ alt = "Kamolpop monogram", ...props }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const variant = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return <img {...props} src={`/brand/kv-monogram-${variant}.png`} alt={alt} data-logo-variant={variant} />;
}
