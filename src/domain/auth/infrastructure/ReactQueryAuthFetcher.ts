import { useMutation } from "@tanstack/react-query";

import { AuthFetcher } from "../domain/fetchers";
import { SaveUserInfoRequest, User } from "../domain/entities";

function useSaveUserInfoMutation(
  mutationFn: (request: SaveUserInfoRequest) => Promise<User>
) {
  const { mutateAsync, isPending, isSuccess, isError, error, data } =
    useMutation({
      mutationFn,
    });

  return {
    mutate: mutateAsync,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
    data,
  };
}

class ReactQueryAuthFetcher implements AuthFetcher {
  readonly saveUserInfoMutation = useSaveUserInfoMutation;
}

export default ReactQueryAuthFetcher;
