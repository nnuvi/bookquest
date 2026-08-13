import { Head, Html, Main, NextScript } from "expo-router/html";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
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
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}