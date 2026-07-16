import { router } from "expo-router";

import ISBNScanner from "@/components/feature/add/ISBNScanner";

export default function ScanISBN() {
  function handleScanned(isbn: string) {
    router.replace({
      pathname: "/book/add/Form",
      params: { isbn },
    });
  }

  return <ISBNScanner onScanned={handleScanned} />;
}