import { SaveUserInfoRequest, User } from "../entities";

interface AuthFetcher {
  readonly saveUserInfoMutation: (
    mutationFn: (request: SaveUserInfoRequest) => Promise<User>
  ) => {
    mutate: (request: SaveUserInfoRequest) => Promise<User>;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
    data: User | undefined;
  };
}

export default AuthFetcher;
