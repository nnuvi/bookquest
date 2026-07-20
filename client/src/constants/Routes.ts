import { Href } from "expo-router";

export const ROUTES = {
  HOME: "/(app)/(tabs)/Homepage",
  MY_PROFILE: "/(app)/(tabs)/MyProfile",
  LANDING: "/Landing",
  LOGIN: "/Login",
  SIGNUP: "/Signup",
  SEARCH: "/(app)/Search",
} as const satisfies Record<string, Href>;