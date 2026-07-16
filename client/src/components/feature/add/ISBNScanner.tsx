import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  CameraView,
  BarcodeScanningResult,
  useCameraPermissions,
} from "expo-camera";
import { LOG_SCOPE, logger } from "@/lib/logger";

type ISBNScannerProps = {
  onScanned: (isbn: string) => void;
};

export default function ISBNScanner({ onScanned }: ISBNScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!permission) return;

    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  function handleBarcodeScanned({ data }: BarcodeScanningResult) {
    if (scanned) return;

    logger.debug(LOG_SCOPE.image, "Barcode Scanner scanned data: ", data);

    setScanned(true);

    const isbn = data.replace(/[- ]/g, "");

    logger.debug(
      LOG_SCOPE.image,
      "Barcode Scanner scanned data (cleaned): ",
      isbn,
    );

    onScanned(isbn);

    timeoutRef.current = setTimeout(() => {
      setScanned(false);
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!permission.granted) {
    return <View style={styles.center} />;
  }

  return (
    <CameraView
      style={StyleSheet.absoluteFill}
      facing="back"
      barcodeScannerSettings={{
        barcodeTypes: ["ean13"],
      }}
      onBarcodeScanned={handleBarcodeScanned}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
