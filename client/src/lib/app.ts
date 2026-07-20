import { Href, router } from "expo-router";

export function getErrorMessage(error: any) {
  return (
    error?.response?.data?.message || error?.message || "Something went wrong."
  );
}

export function navigate(route: Href) {
  router.push(route);
}

export function replace(route: Href) {
  router.replace(route);
}

export function navigateBackOrRoute(route: Href) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(route);
  }
}

export function navigateBackOrHome() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/(app)/(tabs)/Homepage");
  }
}

export function navigateBackOrMyProfile() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/(app)/(tabs)/MyProfile");
  }
}
