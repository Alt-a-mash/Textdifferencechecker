import React from "react";
import { Helmet } from "react-helmet";

export default function HomeMeta() {
  return (
    <Helmet>
      <title>Text Diff Online - Compare Text Online Free | String Diff Checker</title>
      <meta
        name="description"
        content="Free online diff tool to compare two texts and find differences instantly. Text comparison tool with real-time highlighting. Compare text online with our difference finder text checker - no signup required."
      />
      <link rel="canonical" href="https://www.textdiffchecker.net/" />
      <meta name="robots" content="index, follow" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.textdiffchecker.net/" />
      <meta property="og:title" content="TextDiff - Compare Texts Online Free" />
      <meta
        property="og:description"
        content="Free online diff tool to compare two texts and find differences instantly. Real-time highlighting, 100% private, no signup required."
      />
      <meta property="og:image" content="https://www.textdiffchecker.net/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="TextDiff - Compare Texts Online" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.textdiffchecker.net/" />
      <meta property="twitter:title" content="TextDiff - Compare Texts Online Free" />
      <meta
        property="twitter:description"
        content="Free online diff tool to compare two texts and find differences instantly. Real-time highlighting, 100% private, no signup required."
      />
      <meta property="twitter:image" content="https://www.textdiffchecker.net/og-image.png" />
      <meta property="twitter:image:alt" content="TextDiff - Compare Texts Online" />

      {/* Structured Data */}
      <script type="application/ld+json">{`{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TextDiff",
  "url": "https://www.textdiffchecker.net",
  "description": "Compare two texts and highlight differences instantly.",
  "applicationCategory": "WebApplication",
  "image": "https://www.textdiffchecker.net/og-image.png",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}`}</script>
    </Helmet>
  );
}
