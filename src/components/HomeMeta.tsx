// src/components/HomeMeta.tsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function HomeMeta() {
  return (
    <Helmet>
      <title>TextDiffChecker — Compare text online</title>
      <meta
        name="description"
        content="Compare two texts quickly. Shows inline diffs and download options."
      />
      <link rel="canonical" href="https://www.textdiffchecker.net/" />

      {/* Open Graph */}
      <meta property="og:title" content="TextDiffChecker — Compare text online" />
      <meta
        property="og:description"
        content="Compare two texts quickly. Shows inline diffs and download options."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.textdiffchecker.net/" />
      <meta property="og:image" content="https://www.textdiffchecker.net/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
