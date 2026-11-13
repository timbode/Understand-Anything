import type { ComponentPropsWithoutRef } from "react";
import { isLocalImageSrc } from "../utils/imageSrc";

type Props = ComponentPropsWithoutRef<"img"> & { node?: unknown };

/**
 * Markdown `img` renderer that never fetches remote images. A remote image is
 * replaced by its alt text, so viewing a README or a lesson cannot send a
 * request to a third-party server.
 */
export default function SafeMarkdownImage({ src, alt, className, node: _node, ...rest }: Props) {
  void _node;
  const source = typeof src === "string" ? src : undefined;
  if (!isLocalImageSrc(source)) {
    return (
      <span
        className="inline-block text-xs text-text-muted italic border border-border-subtle rounded px-1.5 py-0.5"
        title={source ? `Remote image not loaded: ${source}` : undefined}
      >
        [image{alt ? `: ${alt}` : ""}]
      </span>
    );
  }
  return <img src={source} alt={alt} className={className} {...rest} />;
}
