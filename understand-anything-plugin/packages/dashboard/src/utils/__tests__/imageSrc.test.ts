import { describe, it, expect } from "vitest";
import { isLocalImageSrc } from "../imageSrc";

describe("isLocalImageSrc", () => {
  it.each([
    "docs/diagram.png",
    "./img/logo.svg",
    "/assets/a.png",
    "data:image/png;base64,iVBORw0KGgo=",
  ])("allows local source %s", (src) => {
    expect(isLocalImageSrc(src)).toBe(true);
  });

  it.each([
    "https://example.com/a.png",
    "http://tracker.test/pixel.gif",
    "HTTPS://EXAMPLE.COM/A.PNG",
    "  https://example.com/a.png",
    "//cdn.example.com/a.png",
    "\\\\server\\share\\a.png",
    "ftp://example.com/a.png",
    "javascript:alert(1)",
    "data:text/html,<script></script>",
    "",
    undefined,
  ])("blocks remote or unsafe source %s", (src) => {
    expect(isLocalImageSrc(src)).toBe(false);
  });
});
