import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <meta
          name="description"
          content="BookQuest helps you discover, borrow, lend, and manage your books."
        />

        <meta property="og:title" content="BookQuest" />
        <meta
          property="og:description"
          content="Discover, borrow, lend, and manage your books with BookQuest."
        />
        <meta
          property="og:image"
          content="https://bookquest-eight.vercel.app/preview.png"
        />
        <meta
          property="og:url"
          content="https://bookquest-eight.vercel.app"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BookQuest" />
        <meta
          name="twitter:description"
          content="Discover, borrow, lend, and manage your books with BookQuest."
        />
        <meta
          name="twitter:image"
          content="https://bookquest-eight.vercel.app/preview.png"
        />

        <ScrollViewStyleReset />
      </head>

      <body>{children}</body>
    </html>
  );
}