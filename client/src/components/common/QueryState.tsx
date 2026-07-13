import { ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";

import ErrorScreen from "@/components/common/ErrorScreen";
import NotFoundScreen from "@/components/common/NotFoundScreen";

type QueryStateProps<TData, TError = Error> = {
  query: UseQueryResult<TData, TError>;

  children: (data: TData) => ReactNode;

  loading: ReactNode;

  error?: ReactNode;
  notFound?: ReactNode;
};

export default function QueryState<TData, TError = Error>({
  query,
  children,
  loading,
  error,
  notFound,
}: QueryStateProps<TData, TError>) {
  const { data, isPending, isError, refetch } = query;

  if (isPending) {
    return <>{loading}</>;
  }

  if (isError) {
    return (
      <>
        {error ?? (
          <ErrorScreen
            title="Something went wrong"
            description="Please try again."
            retryText="Retry"
            onRetry={() => refetch()}
          />
        )}
      </>
    );
  }

  if (!data) {
    return (
      <>
        {notFound ?? (
          <NotFoundScreen
            title="Not found"
            description="The requested item could not be found."
          />
        )}
      </>
    );
  }

  return <>{children(data)}</>;
}