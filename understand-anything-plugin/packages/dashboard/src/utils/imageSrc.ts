/**
 * True when a Markdown image source can be shown without a request leaving
 * the machine: inline `data:` URIs and paths relative to the local dashboard
 * server. Anything with a URL scheme (http:, https:, ftp:, …) or a
 * protocol-relative `//host` prefix is remote and is not loaded.
 */
export function isLocalImageSrc(src: string | undefined | null): boolean {
  if (!src) return false;
  const value = src.trim();
  if (value.startsWith("//") || value.startsWith("\\\\")) return false;
  if (/^data:image\//i.test(value)) return true;
  // Any other scheme prefix ("https:", "javascript:", "blob:", …) is rejected.
  return !/^[a-z][a-z0-9+.-]*:/i.test(value);
}
