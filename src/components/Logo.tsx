import React from "react";

type Props = {
  darkMode?: boolean; // if not provided, will fallback to prefers-color-scheme
  alt?: string;
  className?: string;
};

export default function Logo({ darkMode, alt = "TextDiff", className = "" }: Props) {
  // Fallback to system preference if darkMode not passed
  const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = typeof darkMode === "boolean" ? darkMode : prefersDark;

  const lightSrc = "/logo-light.png"; // put file in public/
  const darkSrc = "/logo-dark.png";   // put file in public/

  return (
    <img
      src={isDark ? darkSrc : lightSrc}
      alt={alt}
      className={className}
      width={28}
      height={28}
      style={{ display: "block" }}
    />
  );
}
