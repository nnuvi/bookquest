import FeedbackModal from "@/components/common/FeedbackModal";
import { createContext, useState } from "react";
import type { FeedbackType } from "@/types/app";
import { getErrorMessage } from "@/lib/app";

type FeedbackContextType = {
  success: (message: string, title?: string) => void;
  error: (err: unknown, title?: string) => void;
  errorMessage: (message: string, title?: string) => void;
  close: () => void;
};

export const FeedbackContext = createContext<FeedbackContextType | null>(null);

type State = {
  visible: boolean;
  type: FeedbackType;
  title: string;
  message?: string;
};

export default function FeedbackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<State>({
    visible: false,
    type: "success",
    title: "",
  });

  // const success = (title: string, message?: string) =>
  //   setState({
  //     visible: true,
  //     type: "success",
  //     title,
  //     message,
  //   });

  // const error = (title: string, message?: string) =>
  //   setState({
  //     visible: true,
  //     type: "error",
  //     title,
  //     // message,
  //     message: getErrorMessage(error),
  //   });

  const success = (message: string, title = "Success") =>
    setState({
      visible: true,
      type: "success",
      title,
      message,
    });

  const error = (err: unknown, title = "Failed") =>
    setState({
      visible: true,
      type: "error",
      title,
      message: getErrorMessage(err),
    });

  const errorMessage = (message: string, title = "Failed") =>
    setState({
      visible: true,
      type: "error",
      title,
      message,
    });

  const close = () =>
    setState((s) => ({
      ...s,
      visible: false,
    }));

  return (
    <FeedbackContext.Provider
      value={{
        success,
        error,
        errorMessage,
        close,
      }}
    >
      {children}

      <FeedbackModal
        visible={state.visible}
        type={state.type}
        title={state.title}
        message={state.message}
        onClose={close}
      />
    </FeedbackContext.Provider>
  );
}
