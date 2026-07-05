// import { TouchableOpacity } from "react-native";

// import AppText from "@/components/ui/AppText";

// interface ActionButtonProps {
//   title: string;
//   variant?: "primary" | "neutral" | "success" | "danger";
//   size?: "sm" | "md" | "lg";
//   textSize?: "sm" | "base" | "lg";
//   fullWidth?: boolean;
//   onPress: () => void;
//   disabled?: boolean;
// }

// const sizes = {
//   sm: "h-9 px-3",
//   md: "h-10 px-4",
//   lg: "h-11 px-5",
// };

// export default function ActionButton({
//   title,
//   variant = "primary",
//   size = "sm",
//   textSize = "sm",
//   fullWidth,
//   onPress,
//   disabled = false,
// }: ActionButtonProps) {
//   const styles = {
//     primary: {
//       container: "bg-button",
//       text: "text-text-inverse",
//     },
//     neutral: {
//       container: "bg-neutral-dark",
//       text: "text-text-inverse",
//     },
//     success: {
//       container: "bg-primary-light",
//       text: "text-text",
//     },
//     danger: {
//       container: "bg-decline",
//       text: "text-text",
//     },
//   };

//   const current = styles[variant];

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       disabled={disabled}
//       activeOpacity={0.8}
//       className={`
//           ${current.container}
//           ${sizes[size]}
//           ${fullWidth ? "w-full" : ""}
//           ${disabled ? "opacity-50" : ""}
//           rounded-full
//           items-center
//           justify-center
//         `}
//     >
//       <AppText weight="semibold" size={textSize} className={`${current.text}`}>
//         {title}
//       </AppText>
//     </TouchableOpacity>
//   );
// }
